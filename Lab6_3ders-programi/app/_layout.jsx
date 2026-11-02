import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
    screenOptions={{
        headerStyle: { backgroundColor: '#ce7bb8' },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="index" options={{ title: 'Ders Programım' }} />
    </Stack>
  );
}
