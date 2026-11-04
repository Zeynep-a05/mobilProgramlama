import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import YildizPuan from './YildizPuan';

export default function UrunKarti({ urun, onDetay, onSepeteEkle, puan = 0, yorumSayisi = 0 }) {
    const stokYok = urun.stok === 0;

    return (
        <View style={styles.kart}>
            {/* 1. dokunma alanı: detay */}
            <Pressable
                onPress={onDetay}
                accessibilityLabel={`${urun.ad} detayını aç`}
                style={({ pressed }) => pressed && styles.basili}>
                <Image source={urun.gorsel} style={styles.gorsel} />
                <Text style={styles.ad}>{urun.ad}</Text>
                <View style={styles.puanSatiri}>
                    <YildizPuan puan={puan} boyut={16} />
                    <Text style={styles.puanYazi}>
                     {yorumSayisi > 0
                    ? `${puan.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} (${yorumSayisi})`
                        : 'Henüz yorum yok'}
                    </Text>
                </View>
                <View style={styles.satir}>
                    <Text style={styles.bilgi}>
                        Fiyat: {urun.fiyat.toLocaleString('tr-TR')} TL
                    </Text>
                    <Text style={styles.bilgi}>
                        {stokYok ? 'Stokta yok' : `Stok: ${urun.stok}`}
                    </Text>
                </View>
            </Pressable>

            {/* 2. dokunma alanı: sepete ekle */}
            <Pressable
                onPress={onSepeteEkle}
                disabled={stokYok}
                accessibilityLabel={`${urun.ad} ürününü sepete ekle`}
                style={[styles.ekleButon, stokYok && styles.pasif]}>
                <Text style={styles.ekleYazi}>
                    {stokYok ? 'Stokta yok' : 'Sepete ekle'}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    kart: {
        backgroundColor: '#aab8a6',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e2e2e2',
    },
    basili: {
        opacity: 0.6,
    },
    gorsel: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    ad: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    satir: {
        flexDirection: 'row',
        gap: 16,
    },
    bilgi: {
        fontSize: 16,
        color: '#333',
    }, 
        ekleButon: {
        marginTop: 12,
        backgroundColor: '#2f5d50',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    ekleYazi: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pasif: {
        opacity: 0.4,
    },
    puanSatiri: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
    puanYazi: { fontSize: 14, color: '#333' },
});
