import { FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { tickets } from '../../data/tickets';
import TicketCard from '../../components/TicketCard';

export default function ArizaListesi() {
  const router = useRouter();

  return (
    <FlatList
      data={tickets}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <TicketCard
          ticket={item}
          onPress={() => router.push(`/ariza/${item.id}`)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: '#b7f7ec',
    flexGrow: 1
  }
});