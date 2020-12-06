import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Picker,
  ScrollView,
  Alert,
} from 'react-native';
import {URL} from '../config/config';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import {Blue, White} from '../styles/style';
// import {Picker} from '@react-native-picker/picker';
import {GetKurir} from '../config/config_api';

const RiwayatDetailScreen = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [kurir, setKurir] = useState('');
  const [listKurir, setListKurir] = useState([]);
  const [dataRiwayat, setDataRiwayat] = useState({});

  useEffect(() => {
    const getToken = async () => {
      let tokenUser = await AsyncStorage.getItem('token');
      setToken(tokenUser);
      if (tokenUser == null) {
        signOut();
      }
      await GetKurir()
        .then((res) => {
          if (res.data.err_code === '00') {
            setListKurir(res.data.result);
          }
        })
        .catch((err) => {
          console.log(err.response);
          Alert.alert('Error', 'Gagal Mengambil data dari server');
        });
    };
    let {riwayat} = route.params;
    setDataRiwayat(riwayat);
    getToken();
  }, [route.params]);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: White, width: '100%', height: '100%'}}>
      <View
        style={{
          width: '100%',
          backgroundColor: White,
          alignSelf: 'center',
          elevation: 5,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold'}}>DETAIL RIWAYAT</Text>
      </View>
      <Text style={{fontWeight: 'bold', marginTop: 10, marginLeft: '5%'}}>
        Daftar Buku
      </Text>
      <View style={{width: '100%', maxHeight: '50%'}}>
        <FlatList
          data={dataRiwayat.buku}
          keyExtractor={(item, index) => index.toString()}
          style={{width: '100%'}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailBuku', {data: item})}
              style={{
                width: '90%',
                alignSelf: 'center',
                padding: 5,
                elevation: 5,
                borderRadius: 10,
                backgroundColor: 'white',
                marginVertical: 10,
                flexDirection: 'row',
              }}>
              <View style={{height: '100%', maxWidth: 200}}>
                <Image
                  source={{uri: URL + '/admin/img/' + item.image}}
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: 'contain',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
              </View>
              <View style={{paddingHorizontal: 10, width: '70%'}}>
                <Text style={{fontWeight: 'bold'}}>{item.judul}</Text>
                <Text>Jumlah</Text>
                <Text style={{fontWeight: 'bold'}}>{item.qty} buku</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView style={{width: '100%', maxHeight: '50%'}}>
        <Text style={{fontWeight: 'bold', marginVertical: 5, marginLeft: '5%'}}>
          Type Peminjaman
        </Text>
        <Picker enabled={false} style={{width: '90%', marginLeft: 35}}>
          <Picker.Item
            key="langsung"
            value="langsung"
            label={dataRiwayat.kirim == '0' ? 'LANGSUNG' : 'DELIVERY'}
          />
        </Picker>
        {dataRiwayat.kirim === '1' ? (
          <>
            <Text
              style={{fontWeight: 'bold', marginVertical: 5, marginLeft: '5%'}}>
              Kurir
            </Text>
            <Picker
              enabled={false}
              selectedValue={dataRiwayat.id_kurir}
              style={{width: '90%', marginLeft: 35}}
              onValueChange={(val) => {
                setKurir(val);
              }}>
              {listKurir.length !== 0
                ? listKurir.map((item) => {
                    return (
                      <Picker.Item
                        key={item.id_kurir}
                        value={item.id_kurir}
                        label={item.kurir}
                      />
                    );
                  })
                : null}
            </Picker>
          </>
        ) : null}
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{fontWeight: 'bold', marginVertical: 5, marginLeft: '5%'}}>
            Tanggal Peminjaman
          </Text>
          <Text style={{marginVertical: 5}}> : </Text>
          <Text style={{marginVertical: 5}}>{dataRiwayat.tanggal_pinjam}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{fontWeight: 'bold', marginVertical: 5, marginLeft: '5%'}}>
            Tanggal Harus Kembali
          </Text>
          <Text style={{marginVertical: 5}}> : </Text>
          <Text style={{marginVertical: 5}}>
            {dataRiwayat.tanggal_harus_kembali}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{fontWeight: 'bold', marginVertical: 5, marginLeft: '5%'}}>
            Tanggal Kembali
          </Text>
          <Text style={{marginVertical: 5}}> : </Text>
          <Text style={{marginVertical: 5}}>{dataRiwayat.tanggal_kembali}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default RiwayatDetailScreen;
