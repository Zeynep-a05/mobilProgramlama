import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { urunBul } from '../../data/urunler';
import { useSepet } from '../../context/SepetContext';
import AdetSecici from '../../components/AdetSecici';
import { useYorum } from '../../context/YorumContext';
import YildizPuan from '../../components/YildizPuan';
import YorumFormu from '../../components/YorumFormu';

export default function UrunDetayEkrani() {
  const { id } = useLocalSearchParams();
  const urun = urunBul(id);
  const { sepet, sepeteEkle } = useSepet();
  const [adet, setAdet] = useState(1);
  const [mesaj, setMesaj] = useState('');

  // Kimlik bulunamazsa
  if (!urun) {
    return (
      <SafeAreaView style={styles.ortala} edges={['bottom', 'left', 'right']}>
        <Text style={styles.hata}>Ürün bulunamadı ({id}).</Text>
        <Pressable onPress={() => router.back()} style={styles.anaButon}>
          <Text style={styles.anaButonYazi}>Geri dön</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
  const { urunYorumlari, puanOzeti, yorumEkle } = useYorum();
  const stokYok = urun.stok === 0;
  const yorumlar = urunYorumlari(urun.id);
  const ozet = puanOzeti(urun.id);
  // Sepette zaten olan adedi hesaba kat: toplam stoğu aşmasın
  const sepettekiAdet = sepet.find((s) => s.id === urun.id)?.adet ?? 0;
  const eklenebilir = urun.stok - sepettekiAdet;

  function ekle() {
    if (adet > eklenebilir) return;
    sepeteEkle(urun, adet);
    setMesaj(`${adet} adet sepete eklendi.`);
    setAdet(1);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.icerik} keyboardShouldPersistTaps="handled">
        <Image source={urun.gorsel} style={styles.gorsel} resizeMode="contain" />
        <Text style={styles.ad}>{urun.ad}</Text>
        <View style={styles.puanSatiri}>
          <YildizPuan puan={ozet.ortalama} boyut={20} />
          <Text>
            {ozet.sayi > 0
              ? `${ozet.ortalama.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} · ${ozet.sayi} değerlendirme`
              : 'Henüz değerlendirme yok'}
          </Text>
        </View>
        <Text style={styles.fiyat}>{urun.fiyat.toLocaleString('tr-TR')} TL</Text>
        <Text style={styles.aciklama}>{urun.aciklama}</Text>
        <Text>{stokYok ? 'Stokta yok' : `Stok: ${urun.stok}`}</Text>

        {!stokYok && (
          <>
            <AdetSecici
              adet={adet}
              onArtir={() => setAdet((a) => Math.min(a + 1, eklenebilir))}
              onAzalt={() => setAdet((a) => Math.max(a - 1, 1))}
            />
            {eklenebilir <= 0 && (
              <Text style={styles.uyari}>Bu üründen sepete ekleyebileceğin en fazla adet zaten sepette.</Text>
            )}
          </>
        )}

        <Pressable
          onPress={ekle}
          disabled={stokYok || eklenebilir <= 0}
          accessibilityLabel={`${urun.ad} ürününü sepete ekle`}
          style={[styles.anaButon, (stokYok || eklenebilir <= 0) && styles.pasif]}>
          <Text style={styles.anaButonYazi}>{stokYok ? 'Stokta yok' : 'Sepete ekle'}</Text>
        </Pressable>

        {mesaj !== '' && <Text style={styles.basari}>{mesaj}</Text>}

        <Pressable
          onPress={() => router.push('/sepet')}
          accessibilityLabel="Sepete git"
          style={styles.ikincilButon}>
          <Text style={styles.ikincilYazi}>Sepete git</Text>
          </Pressable>
          <Text style={styles.bolumBaslik}>Değerlendirmeler</Text>

          {yorumlar.length === 0 && (
          <Text style={styles.aciklama}>İlk yorumu sen yaz!</Text>
          )}

          {yorumlar.map((y) => (
          <View key={y.id} style={styles.yorumKart}>
          <View style={styles.yorumUst}>
            <Text style={styles.yorumIsim}>{y.isim}</Text>
            <YildizPuan puan={y.puan} boyut={14} />
          </View>
          <Text>{y.metin}</Text>
        </View>
))}

        <YorumFormu onGonder={(isim, puan, metin) => yorumEkle(urun.id, isim, puan, metin)} />
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icerik: { padding: 16, gap: 12 },
  ortala: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, padding: 16 },
  gorsel: { width: '100%', height: 250, borderRadius: 12, backgroundColor: '#fff' },
  ad: { fontSize: 24, fontWeight: 'bold' },
  fiyat: { fontSize: 20, color: '#2f5d50', fontWeight: 'bold' },
  aciklama: { fontSize: 16, color: '#444' },
  hata: { fontSize: 18 },
  uyari: { color: '#b45309' },
  basari: { color: '#2f5d50', fontWeight: 'bold' },
  anaButon: { backgroundColor: '#2f5d50', padding: 14, borderRadius: 8, alignItems: 'center' },
  anaButonYazi: { color: '#fff', fontWeight: 'bold' },
  pasif: { opacity: 0.4 },
  ikincilButon: { borderWidth: 1, borderColor: '#2f5d50', padding: 14, borderRadius: 8, alignItems: 'center' },
  ikincilYazi: { color: '#2f5d50', fontWeight: 'bold' },
  puanSatiri: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bolumBaslik: { fontSize: 20, fontWeight: 'bold', marginTop: 12 },
  yorumKart: { backgroundColor: '#fff', padding: 12, borderRadius: 10, gap: 4, borderWidth: 1, borderColor: '#eee' },
  yorumUst: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  yorumIsim: { fontWeight: 'bold' },
});