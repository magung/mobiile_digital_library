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
import {GetRiwayat} from '../config/config_api';
import {useIsFocused} from '@react-navigation/native';

const RiwayatScreen = ({navigation}) => {
  const isVisiable = useIsFocused();
  const {signOut} = React.useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [Refreshing, setRefreshing] = useState(false);
  const [dataRiwayat, setDataRiwayat] = useState([]);

  const GetData = async () => {
    setRefreshing(true);
    let User = await AsyncStorage.getItem('account');
    User = JSON.parse(User);
    await GetRiwayat(User.id_member)
      .then((res) => {
        if (res.data.err_code === '00') {
          let datares = res.data.result;
          setDataRiwayat(datares);
        }
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err.response);
        Alert.alert('Error', 'Gagal Mengambil data dari server', [
          {text: 'OK', onPress: () => setRefreshing(false)},
        ]);
      });
  };

  useEffect(() => {
    const getToken = async () => {
      let tokenUser = await AsyncStorage.getItem('token');
      setToken(tokenUser);
      if (tokenUser == null) {
        signOut();
      }
    };
    getToken();
    GetData();
  }, [isVisiable]);
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
        <Text style={{fontWeight: 'bold'}}>RIWAYAT</Text>
      </View>
      <View style={{width: '100%', maxHeight: '100%'}}>
        {dataRiwayat.length === 0 ? (
          <Text style={{alignSelf: 'center', marginTop: 20}}>
            Riwayat Masih Kosong
          </Text>
        ) : null}
        <FlatList
          data={dataRiwayat}
          refreshing={Refreshing}
          onRefresh={() => GetData()}
          keyExtractor={(item, index) => index.toString()}
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{paddingBottom: 50}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RiwayatDetail', {riwayat: item})
              }
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
                  source={{uri: URL + '/admin/img/' + item.buku[0].image}}
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
                <Text style={{fontWeight: 'bold'}}>
                  {item.buku[0].judul +
                    (item.buku.length > 1
                      ? ' + ' + (item.buku.length - 1) + ' buku lainnya'
                      : '')}
                </Text>
                <Text>Tanggal Pinjam :</Text>
                <Text>{item.tanggal_pinjam}</Text>
                <Text>Tanggal Harus Kembali :</Text>
                <Text style={{fontWeight: 'bold'}}>
                  {item.tanggal_harus_kembali === null
                    ? '-'
                    : item.tanggal_harus_kembali}
                </Text>
                <Text>Status :</Text>
                <Text style={{fontWeight: 'bold'}}>
                  {item.status == 'KONFIRMASI'
                    ? 'MENUNGGU KONFIRMASI'
                    : item.status}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default RiwayatScreen;
