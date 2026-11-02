# Mini Ürün Kataloğu

Küçük bir teknoloji mağazasının ürünlerini mobilde listeleyen bir katalog uygulaması. Proje **Expo** ve **Expo Router** ile geliştirildi.

Uygulamada iki ekran var:

| Ekran | Yol | İşlev |
|---|---|---|
| Ürün listesi | `/` | Ürünleri iki sütunlu bir ızgarada gösterir. Her kartta ad, fiyat, kategori ve stok bilgisi yer alır. |
| Ürün detayı | `/urun/[id]` | Seçilen ürünün adını, fiyatını, açıklamasını ve stok bilgisini gösterir. |

Detay ekranından listeye iki yolla dönülür: üst başlıktaki geri oku ya da "Listeye dön" butonu.

---

## Kurulum ve çalıştırma

```bash
npm install
npx expo start
```

Uygulamayı telefonda açmak için **Expo Go** ile QR kodu okutun. Tarayıcıda açmak için terminalde `w` tuşuna basın.

> Expo Go "Project is incompatible" hatası verirse uygulamayı Play Store / App Store'dan güncelleyin.

---

## Klasör yapısı

```
src/
├── app/
│   ├── _layout.jsx      → Stack navigasyon, ekran başlıkları, header stili
│   ├── index.jsx        → Ürün listesi (FlatList, 2 sütun)
│   └── urun/
│       └── [id].jsx     → Ürün detayı + "ürün bulunamadı" ekranı
├── components/
│   └── ProductCard.jsx  → Tek bir ürünü gösteren kart bileşeni
└── data/
    └── products.js      → Ürün verisi (10 ürün)
```

---

## Görevlerin karşılanması

- **ProductCard bileşeni:** `components/ProductCard.jsx` dosyasında. Kart, `product` prop'u üzerinden tek bir ürün alır. Neye basılınca ne olacağını da `onPress` prop'u ile listeden alır.
- **FlatList:** `app/index.jsx` içinde ürünler `FlatList` ile listelenir. `numColumns={2}` ile iki sütun gösterilir, `keyExtractor` olarak ürün `id`'si kullanılır.
- **router.push:** Bir karta basıldığında `` router.push(`/urun/${item.id}`) `` ile detay ekranı açılır.
- **useLocalSearchParams:** `app/urun/[id].jsx` içinde URL'deki `id` değeri bu hook ile okunur. Ürün `products.find()` ile bulunur.
- **Hata ekranı:** `find()` sonuç döndürmezse "Ürün bulunamadı" mesajı, aranan id ve listeye dönme butonu gösterilir. Test etmek için örneğin `/urun/p99` adresine gidilebilir.
- **Stok metni:** Stok 0 ise **"Stokta yok"**, aksi durumda **"Stokta"** yazar. Detay ekranında stok adedi de gösterilir, örneğin "Stokta (8 adet)".
- **Geri gezinme:** Stack navigasyonun geri oku ve `router.back()` çağıran buton ile listeye dönülür.

---

## Veri

`data/products.js` dosyasında başlangıçta verilen 2 ürüne 8 ürün eklendi. Toplam 10 ürün var ve bunların 2'sinin stoğu 0. Böylece "Stokta yok" durumu da gösterilebiliyor.

| Ürün | Kategori | Fiyat | Stok |
|---|---|---|---|
| Kablosuz Fare | Aksesuar | 450 ₺ | 8 |
| Mekanik Klavye | Aksesuar | 1.800 ₺ | 0 |
| Oyun Monitörü | Monitör | 3.500 ₺ | 5 |
| USB-C Hub | Aksesuar | 600 ₺ | 12 |
| Dizüstü Bilgisayar | Bilgisayar | 7.500 ₺ | 0 |
| Kablosuz Kulaklık | Aksesuar | 1.200 ₺ | 15 |
| Web Kamerası | Aksesuar | 800 ₺ | 3 |
| Taşınabilir SSD | Depolama | 950 ₺ | 7 |
| Oyun Konsolu | Konsol | 5.000 ₺ | 2 |
| Akıllı Saat | Aksesuar | 2.200 ₺ | 10 |

---

## Tasarım kararları

### Renk
- **Ana renk mor:** Mor, teknoloji ürünlerine modern ve canlı bir görünüm veriyor. Header, buton ve vurgu renklerinde aynı tonu kullandım; bu sayede uygulama bütünlüklü görünüyor.
- **Açık pembe-mor kartlar:** Kartlar arka plandan ayrışıyor ama temanın dışına çıkmıyor.
- **Yeşil / kırmızı stok rozetleri:** Kullanıcı ürünün alınabilir olup olmadığını tek bakışta anlıyor. Rozetin içinde yazı da olduğu için renkleri ayırt edemeyen kullanıcılar da durumu okuyabiliyor.

### Tipografi
- **Fiyat** en büyük ve kalın yazıyla gösteriliyor, çünkü kullanıcının ilk baktığı bilgi fiyat.
- **Kategori** küçük, büyük harfli ve harf aralıklı yazılıyor; başlık gibi değil etiket gibi duruyor.
- **Fiyat formatı:** `toLocaleString('tr-TR')` ile fiyatlar "1.800 ₺" biçiminde, Türkçe sayı formatıyla gösteriliyor.

### Yerleşim
- **2 sütunlu ızgara:** Ekranda aynı anda daha çok ürün görünüyor ve ürünler yan yana karşılaştırılabiliyor.
- **Kart içi düzen:** Kategori ve stok rozeti üstte, ürün adı ortada, fiyat ve stok adedi altta. Kart yukarıdan aşağı "ne tür → ne → kaç para" sırasıyla okunuyor.
- **Tükenen ürünler soluk:** Stoğu olmayan kartlar `opacity: 0.7` ile soluk gösteriliyor. Dikkat satın alınabilir ürünlere gidiyor ama tükenen ürünler de listede kalıyor.
- **Dokunma geri bildirimi:** Karta basıldığında kart hafifçe küçülüp soluklaşıyor; kullanıcı dokunuşun algılandığını görüyor.

---

## Kullanılan teknolojiler

- React Native
- Expo
- Expo Router (dosya tabanlı yönlendirme, Stack navigasyon)
