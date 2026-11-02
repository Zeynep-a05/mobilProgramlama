import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { tickets } from '../../data/tickets';
import StatusBadge from '../../components/StatusBadge';

export default function ArizaDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const ticket = tickets.find((t) => t.id === id);

  const geriDon = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/ariza');
    }
  };

  if (!ticket) {
    return (
      <View style={styles.bulunamadi}>
        <Stack.Screen options={{ title: 'Bulunamadı' }} />
        <Text style={styles.uyariBaslik}>Arıza bulunamadı</Text>
        <Text style={styles.uyariMetin}>
          "{id}" numaralı bir arıza kaydı yok. Silinmiş ya da hatalı bir bağlantı olabilir.
        </Text>
        <Pressable style={styles.buton} onPress={() => router.replace('/ariza')}>
          <Text style={styles.butonText}>Arıza Listesine Dön</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Arıza #${ticket.id}` }} />

      <Text style={styles.baslik}>{ticket.baslik}</Text>
      <StatusBadge durum={ticket.durum} />

      <Text style={styles.etiket}>Konum</Text>
      <Text style={styles.deger}>{ticket.konum}</Text>

      <Text style={styles.etiket}>Kategori</Text>
      <Text style={styles.deger}>{ticket.kategori}</Text>

      <Text style={styles.etiket}>Açıklama</Text>
      <Text style={styles.deger}>{ticket.aciklama}</Text>

      <Pressable style={styles.buton} onPress={geriDon}>
        <Text style={styles.butonText}>Geri</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#b7f7ec'
  },
  baslik: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10
  },
  etiket: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16
  },
  deger: {
    fontSize: 15,
    color: '#0f172a',
    marginTop: 2
  },
  buton: {
    backgroundColor: '#5383ec',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30
  },
  butonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  bulunamadi: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f1f5f9'
  },
  uyariBaslik: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b91c1c',
    textAlign: 'center'
  },
  uyariMetin: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginTop: 8
  }
});