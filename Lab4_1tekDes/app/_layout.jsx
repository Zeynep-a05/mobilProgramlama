import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#7ac8e0' },
        headerTintColor: '#0f172a',
      }}>
      
      <Stack.Screen name="index" options={{ title: 'Teknik Destek' }} />
      <Stack.Screen name="ariza/index" options={{ title: 'Arıza Listesi' }} />
      <Stack.Screen name="ariza/[id]" options={{ title: 'Arıza Detayı' }} />
      <Stack.Screen name="yeni-ariza" options={{ title: 'Yeni Arıza' }} />

    </Stack>
  );
}

