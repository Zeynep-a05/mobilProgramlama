import { View, Text, StyleSheet } from 'react-native';

const renkler = {
  'Bekliyor': { arka: '#ffedd5', yazi: '#c2410c' },   // turuncu
  'İşlemde': { arka: '#dbeafe', yazi: '#1d4ed8' },    // mavi
  'Çözüldü': { arka: '#dcfce7', yazi: '#15803d' }     // yeşil
};

export default function StatusBadge({ durum }) {
  const renk = renkler[durum] || { arka: '#e2e8f0', yazi: '#475569' };

  return (
    <View style={[styles.badge, { backgroundColor: renk.arka }]}>
      <Text style={[styles.text, { color: renk.yazi }]}>{durum}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999
  },
  text: {
    fontSize: 12,
    fontWeight: '700'
  }
});