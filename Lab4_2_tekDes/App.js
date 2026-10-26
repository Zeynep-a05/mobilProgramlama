import React, { useState } from 'react';

import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  StatusBar,
  useWindowDimensions
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';

// 1. ÖRNEK TALEP VERİLERİ

const baslangicTalepleri = [
  {
    id: 'TLP-1001',
    baslik: 'Bilgisayar açılmıyor',
    kategori: 'Bilgisayar',
    birim: 'Öğrenci İşleri',
    oncelik: 'Yüksek',
    durum: 'Açık'
  },
  {
    id: 'TLP-1002',
    baslik: 'Yazıcı bağlantı sorunu',
    kategori: 'Yazıcı',
    birim: 'Personel Daire Başkanlığı',
    oncelik: 'Orta',
    durum: 'İşlemde'
  },
  {
    id: 'TLP-1003',
    baslik: 'İnternet bağlantısı kesildi',
    kategori: 'İnternet',
    birim: 'Kütüphane',
    oncelik: 'Yüksek',
    durum: 'Açık'
  },
  {
    id: 'TLP-1004',
    baslik: 'Ofis yazılımı hata veriyor',
    kategori: 'Yazılım',
    birim: 'Muhasebe',
    oncelik: 'Düşük',
    durum: 'Tamamlandı'
  },
  {
    id: 'TLP-1005',
    baslik: 'Bilgisayar çok yavaş',
    kategori: 'Bilgisayar',
    birim: 'Mühendislik Fakültesi',
    oncelik: 'Orta',
    durum: 'İşlemde'
  },
  {
    id: 'TLP-1006',
    baslik: 'Yazıcı kağıt sıkıştırıyor',
    kategori: 'Yazıcı',
    birim: 'Rektörlük',
    oncelik: 'Düşük',
    durum: 'Tamamlandı'
  },
  {
    id: 'TLP-1007',
    baslik: 'Kablosuz ağ çalışmıyor',
    kategori: 'İnternet',
    birim: 'Merkezi Derslikler',
    oncelik: 'Yüksek',
    durum: 'Açık'
  },
  {
    id: 'TLP-1008',
    baslik: 'Program lisans sorunu',
    kategori: 'Yazılım',
    birim: 'Bilgi İşlem',
    oncelik: 'Orta',
    durum: 'İşlemde'
  }
];

// 2. SABİT SEÇENEKLER

const filtreler = [
  'Tümü',
  'Açık',
  'İşlemde',
  'Tamamlandı'
];

// 3. RENK YARDIMCI FONKSİYONLARI

const oncelikRengi = (oncelik) => {
  if (oncelik === 'Yüksek') return '#dc2626';
  if (oncelik === 'Orta') return '#d97706';
  return '#16a34a';
};

const durumRengi = (durum) => {
  if (durum === 'Açık') return '#dc2626';
  if (durum === 'İşlemde') return '#2563eb';
  return '#16a34a';
};

// 4. ÖZET KARTI BİLEŞENİ

function OzetKarti({
  baslik,
  sayi,
  renk,
  genislik
}) {
  return (
    <View
      style={[
        styles.summaryCard,
        { width: genislik }
      ]}
    >
      <View
        style={[
          styles.summaryIndicator,
          { backgroundColor: renk }
        ]}
      />

      <Text
        style={[
          styles.summaryNumber,
          { color: renk }
        ]}
      >
        {sayi}
      </Text>

      <Text style={styles.summaryLabel}>
        {baslik}
      </Text>
    </View>
  );
}

// 5. TALEP KARTI BİLEŞENİ

function TalepKarti({
  talep,
  onDurumDegistir
}) {
  const tamamlandi = talep.durum === 'Tamamlandı';

  return (
    <View style={styles.ticketCard}>

      {/* ÜST SATIR */}
      <View style={styles.ticketTop}>

        <Text style={styles.ticketId}>
          {talep.id}
        </Text>

        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor:
                oncelikRengi(talep.oncelik) + '18'
            }
          ]}
        >
          <Text
            style={[
              styles.priorityText,
              { color: oncelikRengi(talep.oncelik) }
            ]}
          >
            {talep.oncelik}
          </Text>
        </View>

      </View>

      {/* ARIZA BAŞLIĞI */}
      <Text style={styles.ticketTitle}>
        {talep.baslik}
      </Text>

      {/* KATEGORİ VE BİRİM */}
      <Text style={styles.ticketDetail}>
        {talep.kategori} • {talep.birim}
      </Text>

      {/* ALT SATIR */}
      <View style={styles.ticketBottom}>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                durumRengi(talep.durum) + '18'
            }
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: durumRengi(talep.durum) }
            ]}
          >
            {talep.durum}
          </Text>
        </View>

        {!tamamlandi && (
          <Pressable
            style={styles.actionButton}
            onPress={() => onDurumDegistir(talep.id)}
          >
            <Text style={styles.actionText}>
              {talep.durum === 'Açık'
                ? 'İşleme Al →'
                : 'Tamamla ✓'}
            </Text>
          </Pressable>
        )}

        {tamamlandi && (
          <Text style={styles.completedText}>
            İşlem tamamlandı
          </Text>
        )}

      </View>
    </View>
  );
}

// 6. ANA YÖNETİM PANELİ

function TeknikDestekPaneli() {

  // STATE
  const [talepler, setTalepler] = useState(
    baslangicTalepleri
  );

  const [aktifFiltre, setAktifFiltre] = useState('Tümü');

  // EKRAN BOYUTLARI
  const { width } = useWindowDimensions();

  // ÖZET KARTI YERLEŞİMİ
  const sutunSayisi = width >= 600 ? 4 : 2;

  const kartGenisligi =
    (width - 40 - (sutunSayisi - 1) * 10)
    / sutunSayisi;

  // TALEP SAYILARI
  const toplam = talepler.length;

  const acik = talepler.filter(
    item => item.durum === 'Açık'
  ).length;

  const islemde = talepler.filter(
    item => item.durum === 'İşlemde'
  ).length;

  const tamamlanan = talepler.filter(
    item => item.durum === 'Tamamlandı'
  ).length;

  // 7. FİLTRELEME

  const filtreliTalepler = talepler.filter((item) => {
    if (aktifFiltre === 'Tümü') {
      return true;
    }

    return item.durum === aktifFiltre;
  });

  // 8. TALEP DURUMU GÜNCELLEME

  const durumDegistir = (id) => {

    setTalepler((oncekiTalepler) =>
      oncekiTalepler.map((item) => {

        if (item.id !== id) {
          return item;
        }

        let yeniDurum = item.durum;

        if (item.durum === 'Açık') {
          yeniDurum = 'İşlemde';
        } else if (item.durum === 'İşlemde') {
          yeniDurum = 'Tamamlandı';
        }

        return {
          ...item,
          durum: yeniDurum
        };
      })
    );
  };

  // 9. LİSTE ÜST ALANI

  const listeBasligi = (
    <View>

      {/* PANEL BAŞLIĞI */}
      <View style={styles.header}>

        <Text style={styles.headerLabel}>
          BİLGİ İŞLEM DAİRE BAŞKANLIĞI
        </Text>

        <Text style={styles.title}>
          Teknik Destek Paneli
        </Text>

        <Text style={styles.subtitle}>
          Destek taleplerini buradan yönetin.
        </Text>

      </View>

      {/* ÖZET KARTLARI */}
      <View style={styles.summaryGrid}>

        <OzetKarti
          baslik="Toplam Talep"
          sayi={toplam}
          renk="#2563eb"
          genislik={kartGenisligi}
        />

        <OzetKarti
          baslik="Açık Talep"
          sayi={acik}
          renk="#dc2626"
          genislik={kartGenisligi}
        />

        <OzetKarti
          baslik="İşlemde"
          sayi={islemde}
          renk="#d97706"
          genislik={kartGenisligi}
        />

        <OzetKarti
          baslik="Tamamlanan"
          sayi={tamamlanan}
          renk="#16a34a"
          genislik={kartGenisligi}
        />

      </View>

      {/* TALEP LİSTESİ BAŞLIĞI */}
      <View style={styles.sectionHeader}>

        <Text style={styles.sectionTitle}>
          Destek Talepleri
        </Text>

        <Text style={styles.sectionCount}>
          {filtreliTalepler.length} kayıt
        </Text>

      </View>

      {/* FİLTRELER */}
      <View style={styles.filterContainer}>

        {filtreler.map((filtre) => (

          <Pressable
            key={filtre}
            onPress={() => setAktifFiltre(filtre)}
            style={[
              styles.filterButton,
              aktifFiltre === filtre &&
                styles.activeFilter
            ]}
          >
            <Text
              style={[
                styles.filterText,
                aktifFiltre === filtre &&
                  styles.activeFilterText
              ]}
            >
              {filtre}
            </Text>
          </Pressable>

        ))}

      </View>

    </View>
  );

  // 10. EKRAN ÇIKTISI

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f1f5f9"
      />

      <FlatList
        data={filtreliTalepler}

        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <TalepKarti
            talep={item}
            onDurumDegistir={durumDegistir}
          />
        )}

        ListHeaderComponent={listeBasligi}

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Kayıt bulunamadı
            </Text>
            <Text style={styles.emptyText}>
              Seçilen duruma ait destek talebi yok.
            </Text>
          </View>
        }

        contentContainerStyle={styles.listContent}

        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

// 11. UYGULAMA KÖKÜ

export default function App() {
  return (
    <SafeAreaProvider>
      <TeknikDestekPaneli />
    </SafeAreaProvider>
  );
}

// 12. STİLLER

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f1f5f9'
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 45,
    flexGrow: 1
  },

  // BAŞLIK
  header: {
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    marginBottom: 18
  },

  headerLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1d4ed8',
    letterSpacing: 0.8
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 9
  },

  subtitle: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8
  },

  // ÖZET KARTLARI
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25
  },

  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 13,
    padding: 16,
    minHeight: 108,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },

  summaryIndicator: {
    width: 28,
    height: 4,
    borderRadius: 2,
    marginBottom: 9
  },

  summaryNumber: {
    fontSize: 29,
    fontWeight: 'bold'
  },

  summaryLabel: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 5
  },

  // LİSTE BAŞLIĞI
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    flexShrink: 1
  },

  sectionCount: {
    fontSize: 13,
    color: '#64748b'
  },

  // FİLTRELER
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 15,
    marginBottom: 18
  },

  filterButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 9
  },

  activeFilter: {
    backgroundColor: '#2563eb'
  },

  filterText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600'
  },

  activeFilterText: {
    color: '#ffffff'
  },

  // TALEP KARTLARI
  ticketCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },

  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },

  ticketId: {
    color: '#64748b',
    fontSize: 12
  },

  priorityBadge: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20
  },

  priorityText: {
    fontSize: 12,
    fontWeight: 'bold'
  },

  ticketTitle: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12
  },

  ticketDetail: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 6
  },

  ticketBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    gap: 10
  },

  statusBadge: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 8
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold'
  },

  actionButton: {
    backgroundColor: '#dbeafe',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8
  },

  actionText: {
    color: '#1d4ed8',
    fontSize: 12,
    fontWeight: 'bold'
  },

  completedText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600'
  },

  // BOŞ LİSTE
  emptyContainer: {
    alignItems: 'center',
    padding: 30,
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#334155'
  },

  emptyText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center'
  }

});