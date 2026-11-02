# Ders Programı

Öğrencinin haftalık derslerini listeleyen ve seçilen dersin detaylarını gösteren basit bir mobil uygulama. React Native, Expo ve Expo Router ile geliştirildi.

## Özellikler

- Haftalık derslerin kart görünümünde listelenmesi
- Güne göre filtreleme (Tümü, Pazartesi–Cuma)
- Karta dokununca dinamik ders detay ekranına geçiş
- Detay ekranında tüm ders bilgileri ve geri dönme seçeneği
- Kayıtlı olmayan bir ders ID'si açıldığında kontrollü "Ders bulunamadı" mesajı
- Seçilen günde ders yoksa bilgilendirme kartı

## Klasör Yapısı

```
app/
  _layout.jsx      → Stack navigasyonu ve ekran başlıkları
  index.jsx        → Ana sayfa: ders listesi ve gün filtresi
  ders/
    [id].jsx       → Dinamik ders detay ekranı
components/
  CourseCard.jsx   → Tek bir dersi gösteren kart bileşeni
data/
  dersler.js       → Ders verileri ve dersBul(id) fonksiyonu
```

## Veri Modeli

Her ders şu alanlardan oluşur:

| Alan | Açıklama |
|---|---|
| `id` | Dersin benzersiz kimliği (ör. `d1`) |
| `ad` | Ders adı |
| `gun` | Dersin günü |
| `saat` | Başlangıç saati |
| `sinif` | Derslik veya laboratuvar |
| `ogretimElemani` | Dersi veren öğretim elemanı |

## Çalıştırma

```bash
npm install
npx expo start
```

Uygulamayı açmak için Expo Go ile QR kodu okutun ya da terminalde `w` tuşuna basarak tarayıcıda açın.

## Hatalı ID Denemesi

Ana sayfadaki **"Hatalı ID dene (d99)"** butonu, kayıtlı olmayan bir ders ID'siyle detay ekranını açar. Bu durumda uygulama çökmez, kullanıcıya bilgi mesajı ve ana sayfaya dönüş butonu gösterir.

Hatalı ID denemesi ekran görüntüsü alındıktan sonra koddan silinmiştir.

---

*Mobil Programlama dersi – Uygulama 3: Öğrenci Ders Programı*
