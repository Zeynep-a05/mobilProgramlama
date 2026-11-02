import { Pressable, View, Text, StyleSheet } from 'react-native';
import StatusBadge from './StatusBadge';

export default function TicketCard({ ticket, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.6 }]}
    >
      <View style={styles.ust}>
        <Text style={styles.baslik}>{ticket.baslik}</Text>
        <StatusBadge durum={ticket.durum} />
      </View>
      <Text style={styles.konum}>📍 {ticket.konum}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#9ee6f8b2',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10
  },
  ust: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  baslik: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a'
  },
  konum: {
    marginTop: 6,
    fontSize: 13,
    color: '#64748b'
  }
});