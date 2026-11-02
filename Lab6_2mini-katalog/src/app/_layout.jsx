import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#401b69' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Mini Ürün Kataloğu' }} />
      <Stack.Screen name="urun/[id]" options={{ title: 'Ürün Detayı' }} />
    </Stack>
  );
}