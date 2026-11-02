import { FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Index() {
  const router = useRouter();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => router.push(`/urun/${item.id}`)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: '#f4ecfc',
    flexGrow: 1,
  },
});