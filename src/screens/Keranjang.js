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
  TextInput,
} from 'react-native';
import {URL} from '../config/config';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import {Blue, White} from '../styles/style';
// import {Picker} from '@react-native-picker/picker';
import {GetCart, GetKurir, AddCart, AddPeminjaman} from '../config/config_api';
import {useIsFocused} from '@react-navigation/native';

const KeranjangScreen = ({navigation}) => {
  const isVisiable = useIsFocused();
  const {signOut} = React.useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [type, setType] = useState('langsung');
  const [kurir, setKurir] = useState('');
  const [dataBukuCart, setDataBukuCart] = useState([]);

  const [qtyBuku, setQtyBuku] = useState([]);

  const hapusBuku = async (id_buku) => {
    let User = await AsyncStorage.getItem('account');
    User = JSON.parse(User);
    let formData = new FormData();
    formData.append('action', 'HAPUS');
    formData.append('buku', id_buku);
    formData.append('id', User.id_member);
    await AddCart(formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.err_code == '00') {
          Alert.alert('Sukses', 'Buku berhasil dihapus dari Keranjang');
        } else {
          Alert.alert('Gagal', 'buku gagal dihapus dari Keranjang');
        }
      })
      .catch((err) => {
        console.log(err.response);
        Alert.alert('Error', 'Tidak dapat terhubung dengan server');
      });
    GetDataCart();
  };

  const [listKurir, setListKurir] = useState([]);
  const GetDataCart = async () => {
    let User = await AsyncStorage.getItem('account');
    User = JSON.parse(User);
    await GetCart(User.id_member)
      .then((res) => {
        if (res.data.err_code === '00') {
          let datares = res.data.result;
          setDataBukuCart(datares);
        } else {
          setDataBukuCart([]);
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
          Alert.alert('Error', 'Tidak dapat terhubung dengan server');
        });
    };
    getToken();
    GetDataCart();
    setQtyBuku([]);
  }, [isVisiable]);

  const PinjamBuku = async () => {
    if (qtyBuku.length !== dataBukuCart.length) {
      Alert.alert('Perhation', 'Mohon isi jumlah buku');
    } else if(type === 'delivery' && kurir == '') {
      Alert.alert('Perhation', 'Mohon memilih kurir');
    } else {
      let User = await AsyncStorage.getItem('account');
      User = JSON.parse(User);
      let jumlahBuku = qtyBuku.join(',');
      let buku = '';
      for (let key = 0; key < dataBukuCart.length; key++) {
        if (buku == '') {
          buku += dataBukuCart[key].id_buku;
        } else {
          buku += ',' + dataBukuCart[key].id_buku;
        }
      }
      let formData = new FormData();
      formData.append('type', type);
      formData.append('buku', buku);
      formData.append('total', jumlahBuku);
      formData.append('id', User.id_member);
      if (type === 'delivery') {
        formData.append('kurir', kurir);
      }
      await AddPeminjaman(formData)
        .then((res) => {
          if (res.data.err_code === '00') {
            Alert.alert(
              'Sukses',
              'Buku yang anda pinjam akan diproses oleh admin',
            );
            GetDataCart();
          } else {
            Alert.alert('Gagal', 'Terjadi kesalahan');
          }
        })
        .catch((err) => {
          console.log(err.response);
          Alert.alert('Error', 'Tidak dapat terhubung dengan server');
        });
    }
  };

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
        <Text style={{fontWeight: 'bold'}}>KERANJANG</Text>
      </View>
      <Text style={{fontWeight: 'bold', marginTop: 10, marginLeft: '5%'}}>
        Daftar Buku
      </Text>
      <View style={{width: '100%', maxHeight: '50%'}}>
        {dataBukuCart.length === 0 ? (
          <Text style={{alignSelf: 'center', marginTop: 20}}>
            Keranjang Masih Kosong
          </Text>
        ) : null}
        <FlatList
          data={dataBukuCart}
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
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    justifyContent: 'center',
                  }}>
                  {/* <TouchableOpacity
                    onPress={() => setQty(qty - 1)}
                    style={{width: 30, height: 30}}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../assets/minus.png')}
                    />
                  </TouchableOpacity> */}
                  <Text style={{fontSize: 20, marginRight: 10}}>Jumlah : </Text>
                  <TextInput
                    value={qtyBuku[index]}
                    placeholder="0"
                    style={{
                      fontSize: 20,
                      minWidth: 20,
                      borderBottomWidth: 1,
                      padding: 0,
                      marginRight: 10,
                      alignItems: 'center',
                    }}
                    keyboardType="numeric"
                    onChangeText={(val) => {
                      let dataOld = qtyBuku;
                      dataOld[index] = val;
                      setQtyBuku(dataOld);
                    }}
                  />
                  {/* <TouchableOpacity
                    onPress={() => setQty(qty + 1)}
                    style={{width: 30, height: 30}}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../assets/add.png')}
                    />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => hapusBuku(item.id_buku)}
                    style={{width: 30, height: 30, marginLeft: 10}}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../assets/trash.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView style={{width: '100%', maxHeight: '50%'}}>
        <Text style={{fontWeight: 'bold', marginVertical: 5, marginLeft: '5%'}}>
          Type Peminjaman
        </Text>
        <Picker
          enabled={dataBukuCart.length !== 0}
          selectedValue={type}
          style={{width: '90%', marginLeft: 35}}
          onValueChange={(val) => {
            setType(val);
          }}>
          <Picker.Item key="langsung" value="langsung" label="LANGSUNG" />
          <Picker.Item key="delivery" value="delivery" label="DELIVERY" />
        </Picker>
        {type === 'delivery' ? (
          <>
            <Text
              style={{fontWeight: 'bold', marginVertical: 5, marginLeft: '5%'}}>
              Kurir
            </Text>
            <Picker
              selectedValue={kurir}
              style={{width: '90%', marginLeft: 35}}
              onValueChange={(val) => {
                setKurir(val);
              }}>
              <Picker.Item key="" value="" label="Pilih Kurir" />
              {listKurir.length !== 0
                ? listKurir.map((item) => {
                    return (
                      <Picker.Item
                        key={item.id_kurir}
                        value={item.id_kurir}
                        label={item.kurir + '  Rp.' + item.biaya}
                      />
                    );
                  })
                : null}
            </Picker>
          </>
        ) : null}
        <TouchableOpacity
          disabled={dataBukuCart.length === 0}
          onPress={() => PinjamBuku()}
          style={{
            width: '80%',
            padding: 10,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: Blue,
            marginVertical: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>PINJAM</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default KeranjangScreen;
