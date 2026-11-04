export const URUNLER = [
    { id: 'P101', ad: 'Laptop', fiyat: 15000,stok: 10,aciklama:'Yüksek performanslı laptop',gorsel: require('../assets/images/laptop.jpg') },
    { id: 'P102', ad: 'Kulaklık', fiyat: 12000,stok: 20,aciklama:'Kaliteli kulaklık',gorsel: require('../assets/images/kulaklik.jpg') },
    { id: 'P103', ad: 'Tablet', fiyat: 8000,stok: 15,aciklama:'Hafif ve taşınabilir tablet',gorsel: require('../assets/images/tablet.jpg') },
    { id: 'P104', ad: 'Akıllı Telefon', fiyat: 10000,stok: 25,aciklama:'En son teknoloji akıllı telefon',gorsel: require('../assets/images/akillitelefon.jpg') },
    { id: 'P105', ad: 'Monitör', fiyat: 3000,stok: 30,aciklama:'Yüksek çözünürlüklü monitör',gorsel: require('../assets/images/monitor.jpg') },
    { id: 'P106', ad: 'Klavye', fiyat: 500,stok: 0,aciklama:'Mekanik klavye',gorsel: require('../assets/images/klavye.jpg') },
]
export function urunBul(id) {
    return URUNLER.find((urun) => urun.id === id);
}