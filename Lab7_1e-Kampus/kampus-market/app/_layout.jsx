import { Stack } from 'expo-router';
import { SepetProvider } from '../context/SepetContext';
import { YorumProvider } from '../context/YorumContext';

export default function RootLayout() {
  return (
    <SepetProvider>
      <YorumProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Ürünler' }} />
          <Stack.Screen name="urun/[id]" options={{ title: 'Ürün detayı' }} />
          <Stack.Screen name="sepet" options={{ title: 'Sepetim' }} />
        </Stack>
      </YorumProvider>
    </SepetProvider>
  );
}