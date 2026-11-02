import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { products } from '../../data/products';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products.find((p) => p.id === id);

  // Ürün bulunamadıysa hata ekranı
  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Ürün bulunamadı</Text>
        <Text style={styles.muted}>"{id}" kimlikli bir ürün yok.</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Listeye dön</Text>
        </Pressable>
      </View>
    );
  }

  const inStock = product.stock > 0;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.muted}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price} ₺</Text>
        <Text style={inStock ? styles.inStock : styles.outOfStock}>
          {inStock ? `Stokta (${product.stock} adet)` : 'Stokta yok'}
        </Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Listeye dön</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4ecfc', gap: 16 },
  card: { backgroundColor: '#f6d4fa', padding: 20, borderRadius: 12, gap: 8 },
  name: { fontSize: 22, fontWeight: '700' },
  price: { fontSize: 24, fontWeight: '700', color: '#1E3A8A' },
  inStock: { color: '#15803D', fontWeight: '600' },
  outOfStock: { color: '#B91C1C', fontWeight: '600' },
  description: { fontSize: 15, lineHeight: 22, marginTop: 8 },
  muted: { fontSize: 13, color: '#64748B' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 },
  errorTitle: { fontSize: 20, fontWeight: '700' },
  button: { backgroundColor: '#9344c0', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
