# 🛒 Kampüs Market

Expo Router ve React Context ile geliştirilmiş, çok ekranlı basit bir alışveriş uygulaması.
**Mobil Programlama dersi, 6. hafta laboratuvar çalışması** kapsamında hazırlanmıştır.

## 📱 Özellikler

- **Ürün listesi:** Ürünler görsel, ad, fiyat, stok ve puan bilgisiyle listelenir.
- **Arama:** Ürün adına göre anlık filtreleme (Türkçe karakter uyumlu).
- **Ürün detayı:** Ürün kimliğiyle bulunur; açıklama, stok, adet seçimi ve sepete ekleme içerir.
- **Sepet:** Ürünler ve adetleri listelenir; artırma, azaltma, kaldırma ve sepeti boşaltma işlemleri yapılabilir.
- **Ortak sepet:** Listeden veya detaydan eklenen ürün aynı sepette görünür.
- **Stok kontrolü:** Stoksuz ürün eklenemez, sepetteki adet stoğu aşamaz, adet 1'in altına inemez.
- **Toplamlar:** Toplam adet ve toplam tutar sepet her değiştiğinde yeniden hesaplanır.
- **Güvenli alan:** İçerik çentik, sistem çubukları ve ekran başlığının altında kalmaz.

### ⭐ Ek özellik: Değerlendirme ve yorum

Laboratuvar föyündeki gereksinimlere ek olarak eklenmiştir:

- Her ürün kartında ortalama puan ve yorum sayısı gösterilir.
- Ürün detayında o ürüne ait yorumlar listelenir.
- Kullanıcı 1–5 yıldız seçip yorum yazabilir; puansız veya boş yorum gönderilemez, isim boş bırakılırsa "Anonim" olarak kaydedilir.
- Yorumlar ayrı bir Context'te (`YorumContext`) tutulur. Detayda eklenen yorum, ürün listesindeki ortalamayı da anında günceller.

## 🛠️ Kullanılan teknolojiler

- React Native (JavaScript)
- Expo
- Expo Router (Stack gezinme)
- React Context API (`createContext`, `useContext`)
- react-native-safe-area-context

## 📂 Proje yapısı

```
kampus-market/
├── app/
│   ├── _layout.jsx          → Ortak Stack, SepetProvider ve YorumProvider
│   ├── index.jsx            → Ürün listesi ve arama
│   ├── sepet.jsx            → Sepet ekranı ve toplamlar
│   └── urun/
│       └── [id].jsx         → Kimliğe göre ürün detayı, yorumlar ve yorum formu
├── components/
│   ├── UrunKarti.jsx        → Tek ürünün tekrar kullanılabilir kartı
│   ├── AdetSecici.jsx       → Artı / eksi düğmeleri
│   ├── SepetOzeti.jsx       → Toplam adet ve tutar
│   ├── YildizPuan.jsx       → Yıldızlı puan gösterimi ve seçimi
│   └── YorumFormu.jsx       → Yorum yazma formu
├── context/
│   ├── SepetContext.jsx     → Ortak sepet state'i ve işlemleri, useSepet hook'u
│   └── YorumContext.jsx     → Yorumlar, ortalama puan hesabı, useYorum hook'u
├── data/
│   ├── urunler.js           → Yerel ürün dizisi ve urunBul fonksiyonu
│   └── yorumlar.js          → Başlangıç yorumları
└── assets/
    └── images/              → Ürün fotoğrafları
```

## 🚀 Kurulum ve çalıştırma

Bilgisayarda **Node.js (LTS)** ve telefonda **Expo Go** uygulaması kurulu olmalıdır.

```bash
git clone <repo-adresi>
cd kampus-market
npm install
npx expo start --clear
```

Terminalde çıkan QR kodu Android'de Expo Go ile, iOS'ta Kamera uygulamasıyla tarayın.
Bilgisayar ve telefon aynı ağda olmalıdır. Yerel ağ engelliyse `npx expo start --tunnel` kullanılabilir.

## 🧠 Sepet neden ortak Provider içinde tutuluyor?

Sepet verisi üç farklı ekranda kullanılıyor: ürün listesi, ürün detayı ve sepet ekranı.
Her ekran kendi sepetini tutsaydı listeden eklenen ürün sepet ekranında görünmezdi.
Bu nedenle sepet `SepetContext` içinde tek bir state olarak tutulur ve `SepetProvider`,
`app/_layout.jsx` içinde bütün Stack'i sarar. Böylece tüm ekranlar `useSepet()` hook'u ile
**aynı** sepeti okur ve günceller. Sepet güncellemelerinde `push` yerine `map`, `filter` ve
yeni dizi oluşturma kullanılır; React state'in değiştiğini yeni dizi geldiğinde algılar.
Toplam adet ve tutar ayrı state olarak tutulmaz, `reduce` ile her render'da sepetten hesaplanır.

## ✅ Test senaryoları

| Deneme | Beklenen sonuç |
|---|---|
| Laptop'u iki kez ekle | Tek satır, adet 2, toplam 30.000 TL |
| Kulaklık ekle | Toplam adet 3, toplam 42.000 TL |
| Laptop'u bir azalt | Adet 1, toplam 27.000 TL |
| Adet 1 iken eksiye bas | Adet 1 kalır |
| Kulaklığı kaldır | Yalnız Laptop kalır, 15.000 TL |
| Stoksuz Klavye'yi eklemeyi dene | Ekleme engellenir, "Stokta yok" görünür |
| Stok sınırını aşmayı dene | Ekleme / artırma engellenir |
| Liste ve sepet arasında geçiş yap | Sepet güncel kalır |
| Sepeti boşalt | Boş sepet mesajı görünür |
| Uygulamayı kapatıp aç | Sepet boş başlar |

> Not: Föydeki örnek ürünler yerine kendi ürün ve fiyatlarım kullanıldığı için test tutarları
> bu fiyatlara göre yeniden hesaplanmıştır.

## 📸 Ekran görüntüleri

![Uygulama ekran görüntüleri](screenshots/e_kampus_zeynep_aydın.jpg)

## ℹ️ Kapsam dışı

Föyde belirtildiği gibi üyelik, internetten ürün çekme, ödeme ve kalıcı kayıt yapılmamıştır.
Uygulama yeniden başlatıldığında sepet ve sonradan eklenen yorumlar sıfırlanır.

---

