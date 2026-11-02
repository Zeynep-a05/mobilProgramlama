# Teknik Destek / Arıza Takip Uygulaması

Mobil Programlama dersi kapsamında React Native ve Expo ile geliştirilmiş bir teknik destek (arıza bildirim ve takip) uygulaması. Kullanıcı yeni arıza bildirebilir, arıza listesini görüntüleyebilir ve her arızanın detayına gidebilir. Ekranlar arası geçiş **Expo Router** ile yapılır.

**Hazırlayan:** Zeynep  
**Ders:** Mobil Programlama

---

## Kullanılan Teknolojiler

- React Native
- Expo (SDK 58)
- Expo Router (dosya tabanlı navigasyon, Stack yapısı)
- react-native-safe-area-context

---

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları kur
npm install

# Uygulamayı başlat (önbelleği temizleyerek)
npx expo start -c
```

Ardından telefondaki **Expo Go** uygulamasıyla terminaldeki QR kodu okutun.

> **Not:** Proje Expo SDK 58 kullanır. Expo Go'nun da SDK 58 sürümü olmalıdır.
> `npm install` sırasında `ERESOLVE` (peer dependency) hatası alınırsa şu komut kullanılabilir:
>
> ```bash
> npm install --legacy-peer-deps
> ```

---

## Klasör Yapısı

```
app/
  _layout.jsx        → Stack navigasyon ve ekran başlıkları
  index.jsx          → Ana ekran
  yeni-ariza.jsx     → Yeni arıza bildirim formu
  ariza/
    index.jsx        → Arıza listesi (FlatList)
    [id].jsx         → Dinamik arıza detay ekranı
components/
  TicketCard.jsx     → Listedeki her arızayı gösteren kart bileşeni
  StatusBadge.jsx    → Duruma göre renklenen etiket bileşeni
data/
  tickets.js         → Örnek arıza verileri
```

---

## Ekranlar

### Ana Ekran (`/`)
Uygulamanın giriş ekranı. "Arıza Listesi" ve "Yeni Arıza Bildir" butonlarıyla diğer ekranlara geçiş sağlar.

### Arıza Listesi (`/ariza`)
`data/tickets.js` içindeki kayıtları `FlatList` ile listeler. Her kayıt `TicketCard` bileşeniyle gösterilir. Bir karta dokunulduğunda o arızanın ID'si ile `/ariza/[id]` ekranı açılır.

### Arıza Detayı (`/ariza/[id]`)
`useLocalSearchParams` ile URL'deki ID okunur ve ilgili arıza bulunur. Başlık, konum, durum, kategori ve açıklama gösterilir; geri butonu ile listeye dönülür.

Olmayan bir ID ile açıldığında (örneğin `/ariza/999`) uygulama çökmez, "Arıza bulunamadı" uyarısı ve listeye dönüş butonu gösterilir.

### Yeni Arıza (`/yeni-ariza`)
Önceki haftada geliştirilen teknik destek formu. Özellikleri:

- Ad soyad, birim, arıza başlığı ve açıklama girişi
- Kategori seçimi (Bilgisayar, Yazıcı, İnternet, Yazılım) ve öncelik seçimi (Düşük, Orta, Yüksek)
- Acil müdahale anahtarı (Switch)
- Doğrulama: boş veya yalnızca boşluk içeren alanlar ile 10 karakterden kısa açıklama kaydedilmez
- Oluşturulan talepler benzersiz ID ile listeye eklenir, önceki kayıtlar korunur
- Talebe kısa dokununca detay penceresi (Modal) açılır
- Talebe uzun basınca silme onayı istenir; "Vazgeç" seçilirse kayıt silinmez
- Talep durumu detay penceresinden değiştirilebilir
- Kaydetme, hata ve silme işlemlerinde kullanıcıya bildirim (Alert) gösterilir

---

## Bileşenler

### `TicketCard`
Bir arızanın başlığını, konumunu ve durumunu gösterir. `ticket` ve `onPress` props'larını alır. Yönlendirme kararını kendisi vermez, böylece farklı ekranlarda tekrar kullanılabilir.

### `StatusBadge`
`durum` değerine göre farklı renkte etiket gösterir:

| Durum     | Renk    |
|-----------|---------|
| Bekliyor  | Turuncu |
| İşlemde   | Mavi    |
| Çözüldü   | Yeşil   |

Tanımlı olmayan bir durum gelirse gri renkte gösterilir.

---

## Bilinen Sınırlamalar

- Yeni Arıza formunda oluşturulan talepler, Arıza Listesi ekranına aktarılmaz. Liste `data/tickets.js` içindeki örnek verilerden okunur, form ise kendi state'ini kullanır.
- Veriler kalıcı olarak saklanmaz; uygulama kapatıldığında formdan eklenen talepler silinir.
