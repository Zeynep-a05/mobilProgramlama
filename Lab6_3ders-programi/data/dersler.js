export const DERSLER = [
  { id: 'd1', ad: 'Mobil Programlama', gun: 'Salı',     saat: '09.00', sinif: 'Lab 2',     ogretimElemani: 'Kübra Sevinç' },
  { id: 'd2', ad: 'Coğrafi Bilgi Sistemleri',        gun: 'Çarşamba', saat: '13.00', sinif: 'Lab 1',     ogretimElemani: 'Emrullah Demirel' },
  { id: 'd3', ad: 'Kablosuz Ağlar',      gun: 'Perşembe', saat: '10.00', sinif: 'Derslik 3', ogretimElemani: 'Sait Demir' },
  { id: 'd4', ad: 'Görüntü İşleme',        gun: 'Cuma',     saat: '11.00', sinif: 'Lab 4',     ogretimElemani: 'Caner Özcan' },
];

export function dersBul(id) {
  return DERSLER.find((ders) => ders.id === id);
}