import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AnaEkran() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teknik Destek Sistemi</Text>

      <Pressable style={styles.button} onPress={() => router.push('/ariza')}>
        <Text style={styles.buttonText}>Arıza Listesi</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondary]}
        onPress={() => router.push('/yeni-ariza')}
      >
        <Text style={styles.buttonText}>Yeni Arıza Bildir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#b7f7ec'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#7195e2',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12
  },
  secondary: {
    backgroundColor: '#2e4f63'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});