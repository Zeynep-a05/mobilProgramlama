import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { dersBul } from '../../data/dersler';

export default function DersDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const ders = dersBul(id);

  if (!ders) {
    return (
      <View style={styles.ortala}>
        <Stack.Screen options={{ title: 'Ders bulunamadı' }} />
        <Text style={styles.hataBaslik}>Ders bulunamadı</Text>
        <Text style={styles.hataMetin}>"{id}" kimlikli bir ders kayıtlı değil.</Text>
        <Pressable style={styles.buton} onPress={() => router.back()}>
          <Text style={styles.butonYazi}>Ana sayfaya dön</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.ekran}>
      <Stack.Screen options={{  title: ders.ad }} />
      <Text style={styles.baslik}>{ders.ad}</Text>

      <Bilgi etiket="Ders kodu" deger={ders.id} />
      <Bilgi etiket="Gün" deger={ders.gun} />
      <Bilgi etiket="Saat" deger={ders.saat} />
      <Bilgi etiket="Sınıf" deger={ders.sinif} />
      <Bilgi etiket="Öğretim elemanı" deger={ders.ogretimElemani} />

      <Pressable style={styles.buton} onPress={() => router.back()}>
        <Text style={styles.butonYazi}>Geri dön</Text>
      </Pressable>
    </View>
  );
}

function Bilgi({ etiket, deger }) {
  return (
    <View style={styles.satir}>
      <Text style={styles.etiket}>{etiket}</Text>
      <Text style={styles.deger}>{deger}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ekran: { flex: 1, padding: 16, backgroundColor: '#dfb9b9' },
  ortala: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  baslik: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  satir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e7e1d8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  etiket: { color: '#161414' },
  deger: { fontWeight: '600' },
  hataBaslik: { fontSize: 22, fontWeight: 'bold', color: '#c0392b', marginBottom: 8 },
  hataMetin: { color: '#555', marginBottom: 16, textAlign: 'center' },
  buton: {
    marginTop: 16,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  butonYazi: { color: '#fff', fontWeight: '600' },
  
  
});