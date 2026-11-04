import { createContext, useContext, useState } from 'react';

const SepetContext = createContext(null);

export function SepetProvider({ children }) {
  // Her satır: { id, ad, fiyat, stok, adet }
  const [sepet, setSepet] = useState([]);

  function sepeteEkle(urun, adet) {
    // Pozitif tam sayı değilse veya stok yoksa ekleme yapma
    if (!Number.isInteger(adet) || adet < 1 || urun.stok === 0) return;

    setSepet((onceki) => {
      const mevcut = onceki.find((s) => s.id === urun.id);

      if (mevcut) {
        // Ürün zaten sepette: yeni satır açma, adedini artır (stoğu aşmadan)
        return onceki.map((s) =>
          s.id === urun.id
            ? { ...s, adet: Math.min(s.adet + adet, urun.stok) }
            : s
        );
      }

      // Ürün sepette yok: yeni satır ekle
      return [
        ...onceki,
        {
          id: urun.id,
          ad: urun.ad,
          fiyat: urun.fiyat,
          stok: urun.stok,
          adet: Math.min(adet, urun.stok),
        },
      ];
    });
  }

  function adetArtir(id) {
    setSepet((onceki) =>
      onceki.map((s) =>
        s.id === id && s.adet < s.stok ? { ...s, adet: s.adet + 1 } : s
      )
    );
  }

  function adetAzalt(id) {
    // Adet 1 ise değiştirme; silmek için Kaldır kullanılır
    setSepet((onceki) =>
      onceki.map((s) =>
        s.id === id && s.adet > 1 ? { ...s, adet: s.adet - 1 } : s
      )
    );
  }

  function urunKaldir(id) {
    setSepet((onceki) => onceki.filter((s) => s.id !== id));
  }

  function sepetiBosalt() {
    setSepet([]);
  }

  return (
    <SepetContext.Provider
      value={{ sepet, sepeteEkle, adetArtir, adetAzalt, urunKaldir, sepetiBosalt }}>
      {children}
    </SepetContext.Provider>
  );
}

// Ekranların sepete ulaşmak için kullanacağı hook
export function useSepet() {
  const deger = useContext(SepetContext);
  if (!deger) {
    throw new Error('useSepet, SepetProvider içinde kullanılmalıdır.');
  }
  return deger;
}