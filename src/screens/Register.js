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
  Picker,
} from 'react-native';

import {
  Styles,
  Yellow,
  Blue,
  White,
  Orange,
  Black,
  font_large,
} from '../styles/style';
// import {Picker} from '@react-native-picker/picker';
import {AuthContext} from '../components/context';
import {Register} from '../config/config_api';
import {MLoading} from '../components/Modals';

const RegisterScreen = ({navigation}) => {
  const {signIn, skipLogin} = React.useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [nama, setNama] = useState('');
  const [WA, setWA] = useState('');
  const [alamat, setAlamat] = useState('');
  const [gender, setGender] = useState('Laki-Laki');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [txtInPassword, setTxtInPassword] = useState('');
  const [txtInEmail, setTxtInEmail] = useState('');
  const [txtInWA, setTxtInWA] = useState('');
  const [txtInAlamat, setTxtInAlamat] = useState('');
  const [txtInStatus, setTxtInStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const RequestRegis = async () => {
    if (
      email == '' ||
      password == '' ||
      nama == '' ||
      WA == '' ||
      alamat == '' ||
      gender == '' ||
      status == ''
    ) {
      Alert.alert('Warning', 'Semua form harus diisi');
    } else {
      let formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('nama', nama);
      formData.append('wa', WA);
      formData.append('jenis_kelamin', gender);
      formData.append('status', status);
      formData.append('alamat', alamat);
      setIsLoading(true);
      await Register(formData)
        .then((res) => {
          setIsLoading(false);
          if (res.data.err_code == '00') {
            navigation.navigate('Login');
            Alert.alert('Sukses', 'Akun anda berhasil terdaftar');
          } else {
            Alert.alert('Gagal', res.data.msg);
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
          <View
            style={{flexDirection: 'row', alignSelf: 'center', paddingTop: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: font_large}}>
              DAFTAR
            </Text>
          </View>
          <View style={Styles.vTextInputTop}>
            <Image
              source={require('../assets/ic_login_email.png')}
              style={Styles.icTextIn}
            />
            <TextInput
              placeholder="Nama"
              style={{height: 50, paddingLeft: 40, fontSize: font_large}}
              onChangeText={(val) => setNama(val)}
              onSubmitEditing={() => txtInEmail.focus()}
              returnKeyType="next"
              value={nama}
            />
          </View>
          <View style={Styles.vTextInput}>
            <Image
              source={require('../assets/ic_login_email.png')}
              style={Styles.icTextIn}
            />
            <TextInput
              placeholder="Email"
              style={{height: 50, paddingLeft: 40, fontSize: font_large}}
              keyboardType="email-address"
              onChangeText={(val) => setEmail(val)}
              ref={(input) => setTxtInEmail(input)}
              onSubmitEditing={() => txtInWA.focus()}
              returnKeyType="next"
              value={email}
            />
          </View>
          <View style={Styles.vTextInput}>
            <Image
              source={require('../assets/ic_login_email.png')}
              style={Styles.icTextIn}
            />
            <TextInput
              placeholder="WA"
              style={{height: 50, paddingLeft: 40, fontSize: font_large}}
              onChangeText={(val) => setWA(val)}
              keyboardType="phone-pad"
              ref={(input) => setTxtInWA(input)}
              onSubmitEditing={() => txtInAlamat.focus()}
              returnKeyType="next"
              value={WA}
            />
          </View>
          <View style={Styles.vTextInput}>
            <Image
              source={require('../assets/ic_login_email.png')}
              style={Styles.icTextIn}
            />
            <TextInput
              placeholder="Alamat"
              style={{height: 50, paddingLeft: 40, fontSize: font_large}}
              onChangeText={(val) => setAlamat(val)}
              ref={(input) => setTxtInAlamat(input)}
              onSubmitEditing={() => txtInStatus.focus()}
              returnKeyType="next"
              value={alamat}
            />
          </View>
          <View style={Styles.vTextInput}>
            <Image
              source={require('../assets/ic_login_email.png')}
              style={Styles.icTextIn}
            />
            <TextInput
              placeholder="Status Pekerjaan"
              style={{height: 50, paddingLeft: 40, fontSize: font_large}}
              onChangeText={(val) => setStatus(val)}
              ref={(input) => setTxtInStatus(input)}
              returnKeyType="next"
              value={status}
            />
          </View>
          <View style={Styles.vTextInput}>
            <Image
              source={require('../assets/ic_login_email.png')}
              style={Styles.icTextIn}
            />
            <Picker
              selectedValue={gender}
              style={{width: '90%', marginLeft: 35}}
              onValueChange={(val) => {
                setGender(val);
                txtInPassword.focus();
              }}>
              <Picker.Item key="M" value="Laki-Laki" label="Laki - Laki" />
              <Picker.Item key="F" value="Perempuan" label="Perempuan" />
            </Picker>
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
            onPress={() => RequestRegis()}
            style={Styles.btnLogin}>
            <Text style={{fontSize: font_large, color: White}}>DAFTAR</Text>
          </TouchableOpacity>
          <View style={Styles.vDaftar}>
            <TouchableOpacity
              style={{width: '100%', alignItems: 'center'}}
              onPress={() => navigation.navigate('Login')}>
              <Text>Sudah punya akun ?</Text>
              <Text style={{fontSize: font_large}}> Masuk</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RegisterScreen;
