import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {

  const butonaBasildi = () => {
    console.log('Profil butonuna basıldı');
  };

  return (
    <View style={styles.container}>

      <View style={styles.kart}>

        <Image
          source={require('C:\\Users\\zeynep\\Desktop\\Mobil programlama\\3. Hafta\\my-app\\assets\\profil.jpg')}
          style={styles.resim}
        />

        <Text style={styles.baslik}>
          Zeynep Aydın
        </Text>

        <Text style={styles.altBaslik}>
          Yazılım Mühendisliği Öğrencisi 
        </Text>


        <View style={styles.konum}>
          <Ionicons
            name="locate-sharp"
            size={20}
            color="#34034b"
          />

          <Text style={styles.konumYazi}>
            Karabük
          </Text>
        </View>

        <Pressable
          style={styles.buton}
          onPress={butonaBasildi}
        >
          <Ionicons
            name="person-circle"
            size={20}
            color="white"
          />

          <Text style={styles.butonYazi}>
            Profili Gör
          </Text>
        </Pressable>
        <Pressable 
          style={styles.buton}
          onPress={() => console.log('İletişim butonuna basıldı')}
        >
          <Ionicons
            name="mail"
            size={20}
            color="white"
          />

          <Text style={styles.butonYazi}>
            İletişim 
          </Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b6b78d',
  },

  kart: {
    width: 300,
    backgroundColor: '#899f87',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },

  resim: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },

  baslik: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  altBaslik: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    marginBottom: 15,
  },

  konum: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  konumYazi: {
    marginLeft: 5,
    fontSize: 16,
  },

  buton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#691189',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },

  butonYazi: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
