import { createContext, useContext, useState } from 'react';
import { BASLANGIC_YORUMLARI } from '../data/yorumlar';

const YorumContext = createContext(null);

export function YorumProvider({ children }) {
  const [yorumlar, setYorumlar] = useState(BASLANGIC_YORUMLARI);

  // Yeni yorum ekler. Başarılıysa true, eksik bilgi varsa false döner.
  function yorumEkle(urunId, isim, puan, metin) {
    const temizMetin = metin.trim();
    if (puan < 1 || puan > 5 || temizMetin === '') return false;

    const yeniYorum = {
      id: Date.now().toString(), // benzersiz kimlik için o anki zaman
      urunId,
      isim: isim.trim() === '' ? 'Anonim' : isim.trim(),
      puan,
      metin: temizMetin,
    };

    setYorumlar((onceki) => [yeniYorum, ...onceki]); // yeni yorum en üste
    return true;
  }

  // Bir ürünün yorumlarını döner
  function urunYorumlari(urunId) {
    return yorumlar.filter((y) => y.urunId === urunId);
  }

  // Bir ürünün ortalama puanı ve yorum sayısı
  function puanOzeti(urunId) {
    const liste = urunYorumlari(urunId);
    if (liste.length === 0) return { ortalama: 0, sayi: 0 };

    const toplam = liste.reduce((t, y) => t + y.puan, 0);
    return { ortalama: toplam / liste.length, sayi: liste.length };
  }

  return (
    <YorumContext.Provider value={{ yorumEkle, urunYorumlari, puanOzeti }}>
      {children}
    </YorumContext.Provider>
  );
}

export function useYorum() {
  const deger = useContext(YorumContext);
  if (!deger) {
    throw new Error('useYorum, YorumProvider içinde kullanılmalıdır.');
  }
  return deger;
}