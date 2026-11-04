import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useSepet } from '../context/SepetContext';
import AdetSecici from '../components/AdetSecici';
import SepetOzeti from '../components/SepetOzeti';

export default function SepetEkrani() {
  const { sepet, adetArtir, adetAzalt, urunKaldir, sepetiBosalt } = useSepet();

  // Toplamlar ayrı state değil; sepet her değiştiğinde yeniden hesaplanır
  const toplamAdet = sepet.reduce((toplam, s) => toplam + s.adet, 0);
  const toplamTutar = sepet.reduce((toplam, s) => toplam + s.fiyat * s.adet, 0);

  // Sepet boşsa
  if (sepet.length === 0) {
    return (
      <SafeAreaView style={styles.bosKapsayici} edges={['bottom', 'left', 'right']}>
        <Text style={styles.bosMetin}>Sepetiniz boş.</Text>
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Ürünlere dön"
          style={styles.anaButon}>
          <Text style={styles.anaButonYazi}>Ürünlere dön</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.kapsayici} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={sepet}
        keyExtractor={(s) => s.id}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item: s }) => (
          <View style={styles.satir}>
            <Text style={styles.ad}>{s.ad}</Text>
            <Text>Birim fiyat: {s.fiyat.toLocaleString('tr-TR')} TL</Text>

            <View style={styles.altSatir}>
              <AdetSecici
                adet={s.adet}
                onArtir={() => adetArtir(s.id)}
                onAzalt={() => adetAzalt(s.id)}
              />
              <Text style={styles.satirToplam}>
                {(s.fiyat * s.adet).toLocaleString('tr-TR')} TL
              </Text>
            </View>

            {s.adet >= s.stok && (
              <Text style={styles.uyari}>Stok sınırına ulaşıldı</Text>
            )}

            <Pressable
              onPress={() => urunKaldir(s.id)}
              accessibilityLabel={`${s.ad} ürününü sepetten kaldır`}
              style={styles.kaldirButon}>
              <Text style={styles.kaldirYazi}>Kaldır</Text>
            </Pressable>
          </View>
        )}
      />

      <SepetOzeti toplamAdet={toplamAdet} toplamTutar={toplamTutar} />

      <Pressable
        onPress={sepetiBosalt}
        accessibilityLabel="Sepeti boşalt"
        style={styles.bosaltButon}>
        <Text style={styles.kaldirYazi}>Sepeti boşalt</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  kapsayici: { flex: 1, padding: 16 },
  bosKapsayici: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, padding: 16 },
  bosMetin: { fontSize: 18 },
  satir: { backgroundColor: '#fff', padding: 16, borderRadius: 12, gap: 8, borderWidth: 1, borderColor: '#e2e2e2' },
  ad: { fontSize: 18, fontWeight: 'bold' },
  altSatir: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  satirToplam: { fontSize: 16, fontWeight: 'bold' },
  uyari: { color: '#b45309', fontSize: 13 },
  kaldirButon: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#fde2e2' },
  kaldirYazi: { color: '#b91c1c', fontWeight: 'bold' },
  bosaltButon: { padding: 12, borderRadius: 8, alignItems: 'center', backgroundColor: '#fde2e2', marginTop: 8 },
  anaButon: { backgroundColor: '#2f5d50', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  anaButonYazi: { color: '#fff', fontWeight: 'bold' },
});