import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function AdetSecici({ adet, onArtir, onAzalt }) {
  return (
    <View style={styles.kutu}>
      <Pressable onPress={onAzalt} accessibilityLabel="Azalt">
        <Text style={styles.dugme}>–</Text>
      </Pressable>
      <Text style={styles.adet}>{adet}</Text>
      <Pressable onPress={onArtir} accessibilityLabel="Artır">
        <Text style={styles.dugme}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  kutu: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  dugme: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 12 },
  adet: { fontSize: 18, fontWeight: 'bold' }
});
