 import { View, Text, StyleSheet } from 'react-native';

export default function SepetOzeti({ toplamTutar, toplamAdet }) {
  return (
    <View style={styles.kutu}>
      <Text style={styles.baslik}>Sepet Özeti</Text>
      <Text style={styles.metin}>Toplam Adet: {toplamAdet}</Text>
      <Text style={styles.metin}>Toplam tutar: {toplamTutar.toLocaleString('tr-TR')} TL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  kutu: { backgroundColor: 'lightgray', padding: 16, margin: 16 },
  baslik: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  metin: { fontSize: 16, marginBottom: 4 }
});
