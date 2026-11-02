import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  ScrollView,
  Alert,
  StyleSheet,
  StatusBar,
  Modal
} from 'react-native';

export default function YeniAriza() {
  const [adSoyad, setAdSoyad] = useState('');
  const [birim, setBirim] = useState('');

  const [baslik, setBaslik] = useState('');
  const [aciklama, setAciklama] = useState('');

  const [kategori, setKategori] = useState('');
  const [oncelik, setOncelik] = useState('Orta');

  const [acil, setAcil] = useState(false);
  const [talepler, setTalepler] = useState([]);
  const [seciliTalep, setSeciliTalep] = useState(null);

  const kategoriler = ['Bilgisayar', 'Yazıcı', 'İnternet', 'Yazılım'];
  const oncelikler = ['Düşük', 'Orta', 'Yüksek'];

  const talepOlustur = () => {
    if (!adSoyad.trim() || !birim.trim() || !baslik.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen zorunlu alanları doldurunuz.');
      return;
    }

    if (aciklama.trim().length < 10) {
      Alert.alert('Geçersiz Açıklama', 'Açıklama en az 10 karakter olmalıdır.');
      return;
    }

    if (!kategori) {
      Alert.alert('Kategori Eksik', 'Lütfen bir kategori seçiniz.');
      return;
    }

    const yeniTalep = {
      id: 'TLP-' + Date.now(),
      adSoyad: adSoyad.trim(),
      birim: birim.trim(),
      baslik: baslik.trim(),
      aciklama: aciklama.trim(),
      kategori: kategori,
      oncelik: oncelik,
      acil: acil,
      durum: 'Açık',
      tarih: new Date().toLocaleString('tr-TR')
    };

    setTalepler((onceki) => [yeniTalep, ...onceki]);

    setAdSoyad('');
    setBirim('');
    setBaslik('');
    setAciklama('');
    setKategori('');
    setOncelik('Orta');
    setAcil(false);

    Alert.alert('Başarılı', 'Teknik destek talebi oluşturuldu.');
  };
  const talepSil = (talep) => {
  Alert.alert(
    'Talebi Sil',
    `"${talep.baslik}" başlıklı talep silinsin mi?`,
    [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => {
          setTalepler((onceki) =>
            onceki.filter((t) => t.id !== talep.id)
          );
          Alert.alert('Silindi', 'Talep başarıyla silindi.');
        }
      }
    ]
  );
};

  return (
  <View style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Teknik Destek Sistemi</Text>

        <Text style={styles.sectionTitle}>Kullanıcı Bilgileri</Text>

        <Text style={styles.label}>Ad Soyad *</Text>
        <TextInput
          style={styles.input}
          placeholder="Adınızı ve soyadınızı giriniz"
          value={adSoyad}
          onChangeText={setAdSoyad}
        />

        <Text style={styles.label}>Birim *</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: Öğrenci İşleri"
          value={birim}
          onChangeText={setBirim}
        />

        <Text style={styles.subtitle}>Yeni Arıza Bildirimi</Text>
        <Text style={styles.sectionTitle}>Arıza Bilgileri</Text>

        <Text style={styles.label}>Arıza Başlığı *</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: Bilgisayar açılmıyor"
          value={baslik}
          onChangeText={setBaslik}
        />

        <Text style={styles.label}>Arıza Açıklaması *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Sorunu ayrıntılı açıklayınız"
          value={aciklama}
          onChangeText={setAciklama}
          multiline={true}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Arıza Kategorisi *</Text>
        <View style={styles.optionsContainer}>
          {kategoriler.map((item) => (
            <Pressable
              key={item}
              onPress={() => setKategori(item)}
              style={[
                styles.optionButton,
                kategori === item && styles.selectedOption
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  kategori === item && styles.selectedOptionText
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Öncelik Seviyesi</Text>
        <View style={styles.optionsContainer}>
          {oncelikler.map((item) => (
            <Pressable
              key={item}
              onPress={() => setOncelik(item)}
              style={[
                styles.optionButton,
                oncelik === item && styles.selectedOption
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  oncelik === item && styles.selectedOptionText
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Acil Müdahale Talebi</Text>
          <Switch
            value={acil}
            onValueChange={setAcil}
            trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
            thumbColor={acil ? '#2563eb' : '#f8fafc'}
          />
        </View>

        <Pressable style={styles.submitButton} onPress={talepOlustur}>
          <Text style={styles.submitButtonText}>Talep Oluştur</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Talepler ({talepler.length})</Text>
        <Text style={styles.talepAlt}>
          Detay için dokunun, silmek için basılı tutun.
        </Text>
        {talepler.length === 0 ? (
          <Text style={styles.bosListe}>Henüz talep oluşturulmadı.</Text>
        ) : (
          talepler.map((talep) => (
            <Pressable
              key={talep.id}
              onPress={() => setSeciliTalep(talep)}
              onLongPress={() => talepSil(talep)}
              style={({ pressed }) => [
                styles.talepKarti,
                pressed && { opacity: 0.6 }
              ]}
            >
              <Text style={styles.talepBaslik}>{talep.baslik}</Text>
              <Text style={styles.talepAlt}>
                {talep.id} • {talep.kategori} • {talep.oncelik}
                {talep.acil ? ' • ACİL' : ''}
              </Text>
              <Text style={styles.talepAlt}>Durum: {talep.durum}</Text>
            </Pressable>
          ))
        )}
      </ScrollView>

      <Modal
        visible={seciliTalep !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSeciliTalep(null)}
      >
        <View style={styles.modalArka}>
          <View style={styles.modalKutu}>
            {seciliTalep && (
              <>
                <Text style={styles.modalBaslik}>{seciliTalep.baslik}</Text>

                <Text style={styles.detayEtiket}>Açıklama</Text>
                <Text style={styles.detayDeger}>{seciliTalep.aciklama}</Text>

                <Text style={styles.detayEtiket}>Kategori</Text>
                <Text style={styles.detayDeger}>{seciliTalep.kategori}</Text>

                <Text style={styles.detayEtiket}>Durum</Text>
                <Text style={styles.detayDeger}>{seciliTalep.durum}</Text>

                <Text style={styles.detayEtiket}>Öncelik / Acil</Text>
                <Text style={styles.detayDeger}>
                  {seciliTalep.oncelik} • {seciliTalep.acil ? 'Acil' : 'Acil değil'}
                </Text>

                <Text style={styles.detayEtiket}>Bildiren</Text>
                <Text style={styles.detayDeger}>
                  {seciliTalep.adSoyad} ({seciliTalep.birim})
                </Text>

                <Text style={styles.detayEtiket}>Talep No / Tarih</Text>
                <Text style={styles.detayDeger}>
                  {seciliTalep.id}{'\n'}{seciliTalep.tarih}
                </Text>

                <Pressable
                  style={styles.kapatButon}
                  onPress={() => setSeciliTalep(null)}
                >
                  <Text style={styles.submitButtonText}>Kapat</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7f7ec'
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a'
  },
  subtitle: {
    fontSize: 17,
    color: '#3470f3',
    marginTop: 8
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color: '#1e293b'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: '#334155'
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 13,
    fontSize: 15,
    color: '#0f172a'
  },
  textArea: {
    minHeight: 110
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1'
  },
  selectedOption: {
    backgroundColor: '#6d57e9',
    borderColor: '#7ea3f5'
  },
  optionText: {
    color: '#334155',
    fontWeight: '500'
  },
  selectedOptionText: {
    color: '#ffffff'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    padding: 14,
    backgroundColor: '#ffffff',
    borderRadius: 10
  },
  switchText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155'
  },
  submitButton: {
    backgroundColor: '#5383ec',
    padding: 16,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  talepKarti: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 14,
    marginTop: 10
  },
  talepBaslik: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4
  },
  talepAlt: {
    fontSize: 13,
    color: '#64748b'
  },
  bosListe: {
    color: '#94a3b8',
    fontStyle: 'italic'
  },
  modalArka: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalKutu: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20
  },
  modalBaslik: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8
  },
  detayEtiket: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 12
  },
  detayDeger: {
    fontSize: 15,
    color: '#0f172a',
    marginTop: 2
  },
  kapatButon: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  }
});
