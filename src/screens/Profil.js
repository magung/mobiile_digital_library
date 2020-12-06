import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../config/config';
import {Styles, White} from '../styles/style';
const ProfilScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [account, setAccount] = useState({});
  useEffect(() => {
    const getToken = async () => {
      let tokenUser = await AsyncStorage.getItem('token');
      setToken(tokenUser);
      if (tokenUser == null) {
        signOut();
      } else {
        let akun = await AsyncStorage.getItem('account');
        setAccount(JSON.parse(akun));
      }
    };
    getToken();
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        source={require('../assets/knowledge.png')}
        style={Styles.icProfileDefault}
      />
      <Image
        source={{uri: URL + '/admin/img/' + account.image}}
        style={Styles.icProfile}
      />
      <View
        style={{
          width: '90%',
          backgroundColor: White,
          marginTop: 10,
          padding: 20,
        }}>
        <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {account.nama}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View>
            <Text>No WA</Text>
            <Text>Email</Text>
            <Text>Alamat</Text>
            <Text>Jenis</Text>
            <Text>Status</Text>
          </View>
          <View>
            <Text> : </Text>
            <Text> : </Text>
            <Text> : </Text>
            <Text> : </Text>
            <Text> : </Text>
          </View>
          <View>
            <Text>{account.no_wa}</Text>
            <Text>{account.email}</Text>
            <Text>{account.alamat}</Text>
            <Text>{account.jenis_kelamin}</Text>
            <Text>{account.status_pekerjaan}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProfilScreen;
