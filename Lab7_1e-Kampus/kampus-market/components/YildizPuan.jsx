import { View, Text, Pressable } from 'react-native';

export default function YildizPuan({ puan, boyut = 18, onSec }) {
  const siralar = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {siralar.map((sira) => {
        const dolu = sira <= Math.round(puan);
        const yildiz = (
          <Text style={{ fontSize: boyut, color: dolu ? '#f5a623' : '#bbb' }}>
            {dolu ? '★' : '☆'}
          </Text>
        );

        // Sadece gösterim
        if (!onSec) {
          return <View key={sira}>{yildiz}</View>;
        }

        // Seçilebilir yıldız
        return (
          <Pressable
            key={sira}
            onPress={() => onSec(sira)}
            hitSlop={6}
            accessibilityLabel={`${sira} yıldız ver`}>
            {yildiz}
          </Pressable>
        );
      })}
    </View>
  );
}