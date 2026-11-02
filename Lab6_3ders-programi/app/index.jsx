import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import CourseCard from '../components/CourseCard';
import { DERSLER } from '../data/dersler';

const GUNLER = ['Tümü','Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

export default function AnaSayfa() {
  const router = useRouter();
  const [seciliGun, setSeciliGun] = useState('Tümü');

  const gosterilenDersler =
    seciliGun === 'Tümü'
      ? DERSLER
      : DERSLER.filter((ders) => ders.gun === seciliGun);

  return (
    <View style={styles.ekran}>
      <View style={styles.filtreSatiri}>
        {GUNLER.map((gun) => (
          <Pressable
            key={gun}
            onPress={() => setSeciliGun(gun)}
            style={[styles.filtre, seciliGun === gun && styles.filtreSecili]}
          >
            <Text style={seciliGun === gun ? styles.filtreYaziSecili : null}>
              {gun}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={gosterilenDersler}
        keyExtractor={(ders) => ders.id}
        renderItem={({ item }) => (
          <CourseCard
            ders={item}
            onPress={() => router.push(`/ders/${item.id}`)}
          />
        )}
        ListEmptyComponent={
        <View style={styles.bosKart}>
            <Text style={styles.bosBaslik}>Ders yok</Text>
            <Text style={styles.bosMetin}>{seciliGun} günü için kayıtlı ders bulunmuyor.</Text>
        </View>
}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  ekran: { flex: 1, padding: 16, backgroundColor: '#dba3a3' },
  filtreSatiri: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  filtre: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#b44c4c',
  },
  filtreSecili: { backgroundColor: '#403b8d', borderColor: '#b41818' },
  filtreYaziSecili: { color: '#fff' },
    hataButon: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#290603',
    alignItems: 'center',
  },
 
   bosKart: {
    backgroundColor: '#aab8a6',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  bosBaslik: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  bosMetin: { color: '#333', textAlign: 'center' },
});


