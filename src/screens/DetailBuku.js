import React, {useState, useEffect} from 'react';
import {Text, View, Image, SafeAreaView, ScrollView, Alert} from 'react-native';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../config/config';
import {Blue, Styles, White} from '../styles/style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AddCart} from '../config/config_api';
const DetailBukuScreen = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [data, setData] = useState({});

  const masukkanKeKeranjang = async () => {
    let User = await AsyncStorage.getItem('account');
    User = JSON.parse(User);
    let formData = new FormData();
    formData.append('action', 'ADD');
    formData.append('buku', data.id_buku);
    formData.append('id', User.id_member);
    await AddCart(formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.err_code == '00') {
          Alert.alert('Sukses', 'Buku berhasil dimasukkan ke Keranjang');
        } else {
          Alert.alert('Gagal', 'Gagal masukkan ke Keranjang');
        }
      })
      .catch((err) => {
        console.log(err.response);
        Alert.alert('Error', 'Tidak dapat terhubung dengan server');
      });
  };

  useEffect(() => {
    const getToken = async () => {
      let tokenUser = await AsyncStorage.getItem('token');
      setToken(tokenUser);
    };
    getToken();
    let {data} = route.params;
    setData(data);
  }, [route.params]);
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <ScrollView style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{width: '100%', height: '100%', padding: 5}}>
          {/* <Image
            source={require('../assets/knowledge.png')}
            style={{width: '100%', resizeMode: 'contain', minHeight: 300}}
            /> */}
          <Image
            source={{uri: URL + '/admin/img/' + data.image}}
            style={{
              width: '100%',
              resizeMode: 'contain',
              minHeight: 300,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              width: '90%',
              backgroundColor: White,
              marginTop: 10,
              padding: 20,
              alignSelf: 'center',
            }}>
            <Text
              style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
              {data.judul}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Penulis</Text>
            <Text>{data.penulis}</Text>
            <Text style={{fontWeight: 'bold'}}>Penerbit</Text>
            <Text>{data.penerbit}</Text>
            <Text style={{fontWeight: 'bold'}}>Tahun Terbit</Text>
            <Text>{data.tahun_terbit}</Text>
            <Text style={{fontWeight: 'bold'}}>ISBN</Text>
            <Text>{data.isbn}</Text>
            <Text style={{fontWeight: 'bold'}}>Jumlah Tersedia</Text>
            <Text>{data.stok}</Text>
            <Text style={{fontWeight: 'bold'}}>Deskripsi</Text>
            <Text>{data.deskripsi}</Text>
          </View>

          <TouchableOpacity
            onPress={() => (token !== null ? masukkanKeKeranjang() : signOut())}
            style={{
              width: '80%',
              minHeight: 20,
              backgroundColor: Blue,
              alignItems: 'center',
              padding: 10,
              marginVertical: 20,
              alignSelf: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Masukkan ke Keranjang
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailBukuScreen;
