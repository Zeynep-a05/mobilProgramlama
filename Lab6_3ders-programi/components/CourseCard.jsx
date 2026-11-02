import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CourseCard({ ders, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.kart, pressed && styles.basili]}
    >
      <Text style={styles.ad}>{ders.ad}</Text>
      <View style={styles.satir}>
        <Text style={styles.bilgi}>{ders.gun}</Text>
        <Text style={styles.bilgi}>{ders.saat}</Text>
        <Text style={styles.bilgi}>{ders.sinif}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kart: {
    backgroundColor: '#aab8a6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  basili: {
    opacity: 0.6,
  },
  ad: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  satir: {
    flexDirection: 'row',
    gap: 16,
  },
  bilgi: {
    color: '#555',
  },
});