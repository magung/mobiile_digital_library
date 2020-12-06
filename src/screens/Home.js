import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {GetBuku, GetKategori} from '../config/config_api';
import {URL} from '../config/config';
import {White, Styles, Primary} from '../styles/style';
const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('');
  const [dataBuku, setDataBuku] = useState([]);
  const [dataKat, setDataKat] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scan, setScan] = useState(false);
  const [scanner, setScanner] = useState(null);

  const onSuccess = (result) => {
    Alert.alert('QR Scanned!', JSON.stringify(result.data));
    if (result.data.length !== 0) {
      // RequestAbsent(result.data);
      setSearch(result.data);
      GetDataBuku(result.data);
    }
  };

  const GetDataBuku = async (s = '', kat = '', limit = '21') => {
    setRefreshing(true);
    await GetBuku(s, kat, limit)
      .then((res) => {
        console.log(res.data);
        if (res.data.err_code === '00') {
          setDataBuku(res.data.result);
          setRefreshing(false);
        } else {
          Alert.alert('Data Kosong', 'buku tidak ditemukan', [
            {text: 'OK', onPress: () => setRefreshing(false)},
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Error', 'Gagal Mengambil data dari server', [
          {text: 'OK', onPress: () => setRefreshing(false)},
        ]);
      });
  };
  const GetDataKat = async () => {
    await GetKategori().then((res) => {
      if (res.data.err_code === '00') {
        setDataKat(res.data.result);
      }
    });
  };
  useEffect(() => {
    GetDataBuku();
    GetDataKat();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, width: '100%', height: '100%'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Pilih Kategori</Text>
            <TouchableOpacity
              onPress={() => {
                GetDataBuku(search, '');
                setKategori('');
              }}
              style={{
                borderWidth: 1,
                marginVertical: 5,
                width: '100%',
                borderRadius: 10,
                padding: 5,
                borderColor: Primary,
                backgroundColor: kategori == '' ? Primary : White,
              }}>
              <Text style={{color: kategori == '' ? White : Primary}}>
                Semua Kategori
              </Text>
            </TouchableOpacity>
            <FlatList
              data={dataKat}
              keyExtractor={(item, index) => index.toString()}
              style={{width: '100%'}}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    GetDataBuku(search, item.id_kategori);
                    setKategori(item.id_kategori);
                  }}
                  key={item.id_kategori}
                  style={{
                    borderWidth: 1,
                    marginVertical: 5,
                    width: '100%',
                    borderRadius: 10,
                    padding: 5,
                    borderColor: Primary,
                    backgroundColor:
                      kategori == item.id_kategori ? Primary : White,
                  }}>
                  <Text
                    style={{
                      color: kategori == item.id_kategori ? White : Primary,
                    }}>
                    {item.kategori}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={{
                ...styles.openButton,
                backgroundColor: '#2196F3',
                marginTop: 10,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>TUTUP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={scan}
        onRequestClose={() => setScan(false)}>
        <View style={styles.centeredView1}>
          <View>
            <Text style={styles.modalText}>SCAN QR BUKU</Text>
            <QRCodeScanner
              onRead={onSuccess}
              ref={(node) => {
                setScanner(node);
              }}
              flashMode={RNCamera.Constants.FlashMode.off}
              showMarker={false}
              bottomContent={
                <View style={{paddingVertical: 10}}>
                  <TouchableOpacity
                    style={{
                      ...styles.openButton,
                      backgroundColor: '#2196F3',
                      marginTop: 10,
                    }}
                    onPress={() => scanner.reactivate()}>
                    <Text style={styles.textStyle}>SCAN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.openButton,
                      backgroundColor: '#2196F3',
                      marginTop: 10,
                    }}
                    onPress={() => {
                      setScan(!scan);
                    }}>
                    <Text style={styles.textStyle}>TUTUP</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
      <View
        style={{
          width: '95%',
          margin: 5,
          backgroundColor: White,
          alignSelf: 'center',
          elevation: 5,
          borderRadius: 10,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <TextInput
          placeholder="Cari buku yang anda inginkan"
          onChangeText={(val) => setSearch(val)}
          value={search}
        />
        <TouchableOpacity
          onPress={() => GetDataBuku(search)}
          style={{position: 'absolute', right: 55, alignItems: 'center'}}>
          <Image
            source={require('../assets/search.png')}
            style={Styles.icSearch}
          />
          <Text style={{fontSize: 10}}>cari</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{position: 'absolute', right: 10, alignItems: 'center'}}>
          <Image
            source={require('../assets/search_kat.png')}
            style={Styles.icSearch}
          />
          <Text style={{fontSize: 10}}>kategori</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataBuku}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={{
          width: '100%',
          justifyContent: 'center',
        }}
        numColumns={3}
        refreshing={Refreshing}
        onRefresh={() => GetDataBuku(search, kategori)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: '30%',
              margin: 5,
              backgroundColor: White,
              borderRadius: 10,
              elevation: 5,
              minHeight: 200,
            }}
            onPress={() => navigation.navigate('DetailBuku', {data: item})}
            key={item.id_buku}>
            <Image
              source={{uri: URL + '/admin/img/' + item.image}}
              style={{
                maxWidth: '100%',
                minHeight: 150,
                resizeMode: 'cover',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <View style={{padding: 3, alignItems: 'center'}}>
              <Text
                style={{fontWeight: 'bold'}}
                numberOfLines={3}
                lineBreakMode="tail">
                {item.judul}
              </Text>
              <Text style={{fontSize: 10}}>Tersedia {item.stok} buku</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => setScan(true)}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          alignItems: 'center',
          backgroundColor: White,
          borderRadius: 100,
          width: 75,
          height: 75,
          justifyContent: 'center',
        }}>
        <Image source={require('../assets/qr-code.png')} style={Styles.icQR} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingVertical: 30,
  },
  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingVertical: 30,
    backgroundColor: 'white',
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonTouchable: {
    padding: 16,
    alignSelf: 'center',
  },
});
