import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import YildizPuan from './YildizPuan';

export default function YorumFormu({ onGonder }) {
  const [isim, setIsim] = useState('');
  const [puan, setPuan] = useState(0);
  const [metin, setMetin] = useState('');
  const [hata, setHata] = useState('');

  function gonder() {
    if (puan === 0) {
      setHata('Lütfen bir puan seçin.');
      return;
    }
    if (metin.trim() === '') {
      setHata('Lütfen yorumunuzu yazın.');
      return;
    }

    onGonder(isim, puan, metin);

    // Formu temizle
    setIsim('');
    setPuan(0);
    setMetin('');
    setHata('');
  }

  return (
    <View style={styles.kutu}>
      <Text style={styles.baslik}>Yorum yaz</Text>

      <YildizPuan puan={puan} boyut={30} onSec={setPuan} />

      <TextInput
        value={isim}
        onChangeText={setIsim}
        placeholder="Adınız (isteğe bağlı)"
        style={styles.girdi}
      />

      <TextInput
        value={metin}
        onChangeText={setMetin}
        placeholder="Ürün hakkındaki düşünceleriniz..."
        multiline
        style={[styles.girdi, styles.cokSatir]}
      />

      {hata !== '' && <Text style={styles.hata}>{hata}</Text>}

      <Pressable onPress={gonder} accessibilityLabel="Yorumu gönder" style={styles.buton}>
        <Text style={styles.butonYazi}>Gönder</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  kutu: { backgroundColor: '#fff', padding: 16, borderRadius: 12, gap: 10, borderWidth: 1, borderColor: '#e2e2e2' },
  baslik: { fontSize: 18, fontWeight: 'bold' },
  girdi: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  cokSatir: { minHeight: 80, textAlignVertical: 'top' },
  hata: { color: '#b91c1c' },
  buton: { backgroundColor: '#2f5d50', padding: 12, borderRadius: 8, alignItems: 'center' },
  butonYazi: { color: '#fff', fontWeight: 'bold' },
});