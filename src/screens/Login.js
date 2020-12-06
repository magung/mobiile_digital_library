import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import {
  Styles,
  Yellow,
  Blue,
  White,
  Orange,
  Black,
  font_large,
  Primary,
} from '../styles/style';
import {AuthContext} from '../components/context';
import {Login} from '../config/config_api';
import {MLoading} from '../components/Modals';

const LoginScreen = ({navigation}) => {
  const {signIn, skipLogin} = React.useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [txtInPassword, setTxtInPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const RequestLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Warning', 'Email dan password harus diisi');
    } else {
      setIsLoading(true);
      await Login(email, password)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          if (res.data.err_code == '00') {
            let dataUser = {
              email: email,
              token: res.data.token,
              account: JSON.stringify(res.data.result),
            };
            signIn(dataUser);
          } else {
            Alert.alert('Failed', res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err.response);
          setIsLoading(false);
          return Alert.alert('Error', 'cannot connect to server');
        });
    }
  };

  return (
    <>
      <MLoading visible={isLoading} />
      <SafeAreaView>
        <ScrollView style={Styles.container}>
          <Image
            source={require('../assets/knowledge.png')}
            style={Styles.icLogin}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={{fontSize: font_large}}>Selamat datang di </Text>
            <Text style={{fontWeight: 'bold', fontSize: font_large}}>
              Library
            </Text>
          </View>
          <View style={Styles.vTextInputTop}>
            <Image
              source={require('../assets/ic_login_email.png')}
              style={Styles.icTextIn}
            />
            <TextInput
              placeholder="Email"
              style={Styles.textInput}
              keyboardType="email-address"
              onChangeText={(val) => setEmail(val)}
              onSubmitEditing={() => txtInPassword.focus()}
              returnKeyType="next"
              value={email}
            />
          </View>
          <View style={Styles.vTextInput}>
            <Image
              source={require('../assets/ic_login_password.png')}
              style={Styles.icTextIn}
            />
            <TextInput
              placeholder="Password"
              style={Styles.textInputPass}
              keyboardType="default"
              secureTextEntry={!showPass}
              ref={(input) => setTxtInPassword(input)}
              onChangeText={(val) => setPassword(val)}
              value={password}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 10}}
              onPress={() => setShowPass(!showPass)}>
              <Text>{!showPass ? 'LIHAT' : 'SEMBUNYIKAN'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => RequestLogin()}
            style={Styles.btnLogin}>
            <Text style={{fontSize: font_large, color: White}}>MASUK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => skipLogin()}
            style={Styles.btnLewati}>
            <Text style={{fontSize: font_large, color: White}}>LEWATI</Text>
          </TouchableOpacity>
          <View style={Styles.vDaftar}>
            <TouchableOpacity
              style={{width: '100%', alignItems: 'center'}}
              onPress={() => navigation.navigate('Register')}>
              <Text>Belum punya akun ?</Text>
              <Text style={{fontSize: font_large}}> Daftar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
