import { Pressable, View, Text, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress }) {
  const { name, price, category, stock } = product;
  const inStock = stock > 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, !inStock && styles.soldOut]}
    >
      {/* Üst satır: kategori solda, stok rozeti sağda */}
      <View style={styles.row}>
        <Text style={styles.category}>{category.toUpperCase()}</Text>
        <View style={[styles.badge, { backgroundColor: inStock ? '#e4f8eb' : '#FEE2E2' }]}>
          <Text style={[styles.badgeText, { color: inStock ? '#15803D' : '#B91C1C' }]}>
            {inStock ? 'Stokta' : 'Stokta yok'}
          </Text>
        </View>
      </View>

      <Text style={styles.name}>{name}</Text>

      {/* Alt satır: fiyat solda, stok adedi sağda */}
      <View style={styles.row}>
        <Text style={styles.price}>{price.toLocaleString('tr-TR')} ₺</Text>
        <Text style={styles.stockCount}>Stok: {stock}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f6d4fa',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#77658b',
    elevation: 2,
    width: '48%',
    
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  soldOut: { opacity: 0.7 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
  category: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: '#64748B' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  name: { fontSize: 17, fontWeight: '600', color: '#0F172A' },
  price: { fontSize: 18, fontWeight: '700', color: '#142b79' },
  stockCount: { fontSize: 13, color: '#64748B' },
});