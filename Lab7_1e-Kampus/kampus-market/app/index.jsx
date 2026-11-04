import { useState } from 'react';
import { Text, Pressable, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import UrunKarti from '../components/UrunKarti';
import { URUNLER } from '../data/urunler';
import { useSepet } from '../context/SepetContext';
import { useYorum } from '../context/YorumContext';

export default function UrunlerEkrani() {
  const [arama, setArama] = useState('');
  const { sepet, sepeteEkle } = useSepet();
  const { puanOzeti } = useYorum();
  const toplamAdet = sepet.reduce((toplam, s) => toplam + s.adet, 0);

  const filtreli = URUNLER.filter((urun) =>
  urun.ad.toLocaleLowerCase('tr-TR').includes(arama.toLocaleLowerCase('tr-TR'))
  );
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 12 }} edges={['bottom', 'left', 'right']}>
      <TextInput
        value={arama}
        onChangeText={setArama}
        placeholder="Ürün ara..."
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, backgroundColor: '#fff' }}
      />

      <Pressable
        onPress={() => router.push('/sepet')}
        accessibilityLabel="Sepete git"
        style={{ backgroundColor: '#2f5d50', padding: 12, borderRadius: 8, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sepete git ({toplamAdet})</Text>
      </Pressable>

      <FlatList
        data={filtreli}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const ozet = puanOzeti(item.id);
          return (
          <UrunKarti
            urun={item}
            puan={ozet.ortalama}
            yorumSayisi={ozet.sayi}
            onDetay={() => router.push({ pathname: '/urun/[id]', params: { id: item.id } })}
            onSepeteEkle={() => sepeteEkle(item, 1)}
          />
          );
        }}
        ListEmptyComponent={<Text>Aramanıza uygun ürün bulunamadı</Text>}
      />
    </SafeAreaView>
  );
}