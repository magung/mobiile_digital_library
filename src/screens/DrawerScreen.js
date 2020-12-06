import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Styles, Grey} from '../styles/style';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';

export function DrawerScreen(props) {
  const {signOut} = React.useContext(AuthContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      let tokenUser = await AsyncStorage.getItem('token');
      setToken(tokenUser);
      if (tokenUser !== null) {
        let account = await AsyncStorage.getItem('account');
      }
    };
    getToken();
  }, []);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <SafeAreaView style={Styles.drawerContent}>
            {token == null ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Home');
                  }}
                  style={Styles.drawerBtn}>
                  <Image
                    source={require('../assets/book.png')}
                    style={Styles.icDrawer}
                  />
                  <Text style={Styles.drawerTxt}>{'Buku'}</Text>
                </TouchableOpacity>
                <View style={Styles.garisDrawer} />
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Keranjang');
                  }}
                  style={Styles.drawerBtn}>
                  <Image
                    source={require('../assets/keranjang.png')}
                    style={Styles.icDrawer}
                  />
                  <Text style={Styles.drawerTxt}>{'Keranjang'}</Text>
                </TouchableOpacity>
                <View style={Styles.garisDrawer} />
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Riwayat');
                  }}
                  style={Styles.drawerBtn}>
                  <Image
                    source={require('../assets/books.png')}
                    style={Styles.icDrawer}
                  />
                  <Text style={Styles.drawerTxt}>{'Riwayat'}</Text>
                </TouchableOpacity>
                <View style={Styles.garisDrawer} />
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Profil');
                  }}
                  style={Styles.drawerBtn}>
                  <Image
                    source={require('../assets/profil.png')}
                    style={Styles.icDrawer}
                  />
                  <Text style={Styles.drawerTxt}>{'Profil'}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Home');
                  }}
                  style={Styles.drawerBtn}>
                  <Image
                    source={require('../assets/book.png')}
                    style={Styles.icDrawer}
                  />
                  <Text style={Styles.drawerTxt}>{'Buku'}</Text>
                </TouchableOpacity>
                <View style={Styles.garisDrawer} />
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Keranjang');
                  }}
                  style={Styles.drawerBtn}>
                  <Image
                    source={require('../assets/keranjang.png')}
                    style={Styles.icDrawer}
                  />
                  <Text style={Styles.drawerTxt}>{'Keranjang'}</Text>
                </TouchableOpacity>
                <View style={Styles.garisDrawer} />
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Riwayat');
                  }}
                  style={Styles.drawerBtn}>
                  <Image
                    source={require('../assets/books.png')}
                    style={Styles.icDrawer}
                  />
                  <Text style={Styles.drawerTxt}>{'Riwayat'}</Text>
                </TouchableOpacity>
                <View style={Styles.garisDrawer} />
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Profil');
                  }}
                  style={Styles.drawerBtn}>
                  <Image
                    source={require('../assets/profil.png')}
                    style={Styles.icDrawer}
                  />
                  <Text style={Styles.drawerTxt}>{'Profil'}</Text>
                </TouchableOpacity>
              </>
            )}
            <View style={Styles.garisDrawer} />
            <TouchableOpacity
              onPress={() => signOut()}
              style={Styles.drawerBtn}>
              <Image
                source={
                  token == null
                    ? require('../assets/enter.png')
                    : require('../assets/logout.png')
                }
                style={Styles.icDrawer}
              />
              <Text style={Styles.drawerTxt}>
                {token == null ? 'Masuk' : 'Keluar'}
              </Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center', paddingTop: 20}}>
              <Image
                source={require('../assets/knowledge.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Library</Text>
              <Text style={{fontSize: 12}}>v 1.0</Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
