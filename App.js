import * as React from 'react';
import {StatusBar, Text, Image, Alert, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import {Styles, Orange, White, Black, Blue} from './src/styles/style';
import {AuthContext} from './src/components/context';
import {DrawerScreen} from './src/screens/DrawerScreen';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import HomeScreen from './src/screens/Home';
import KeranjangScreen from './src/screens/Keranjang';
import RiwayatScreen from './src/screens/Riwayat';
import RiwayatDetailScreen from './src/screens/RiwayatDetail';
import ProfilScreen from './src/screens/Profil';
import DetailBukuScreen from './src/screens/DetailBuku';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DrawerPublic = () => (
  <>
    <Drawer.Screen name="Home" component={MainTabSkipScreen} />
    <Drawer.Screen name="DetailBuku" component={DetailBukuScreen} />
    <Drawer.Screen name="RiwayatDetail" component={RiwayatDetailScreen} />
  </>
);

const DrawerMenuSkipLogin = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerScreen {...props} />}>
    {DrawerPublic()}
  </Drawer.Navigator>
);

const RootStackScreen = ({navigation}) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainTabSkipScreen = ({navigation}) => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: Black,
      keyboardHidesTabBar: true,
      inactiveBackgroundColor: White,
      activeBackgroundColor: White,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Buku',
        tabBarIcon: (onfocus) => (
          <Image
            source={require('./src/assets/book.png')}
            style={onfocus.focused ? Styles.iconBottom : Styles.iconBottom2}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Keranjang"
      component={KeranjangScreen}
      options={{
        tabBarLabel: 'Keranjang',
        tabBarIcon: (onfocus) => (
          <Image
            source={require('./src/assets/keranjang.png')}
            style={onfocus.focused ? Styles.iconBottom : Styles.iconBottom2}
          />
        )
      }}
      
    />
     <Tab.Screen
      name="Riwayat"
      component={RiwayatScreen}
      options={{
        tabBarLabel: 'Riwayat',
        tabBarIcon: (onfocus) => (
          <Image
            source={require('./src/assets/books.png')}
            style={onfocus.focused ? Styles.iconBottom : Styles.iconBottom2}
          />
        ),
      }}
    />
     <Tab.Screen
      name="Profil"
      component={ProfilScreen}
      options={{
        tabBarLabel: 'Profil',
        tabBarIcon: (onfocus) => (
          <Image
            source={require('./src/assets/profil.png')}
            style={onfocus.focused ? Styles.iconBottom : Styles.iconBottom2}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: Black,
      keyboardHidesTabBar: true,
      inactiveBackgroundColor: White,
      activeBackgroundColor: White,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Buku',
        tabBarIcon: (onfocus) => (
          <Image
            source={require('./src/assets/book.png')}
            style={onfocus.focused ? Styles.iconBottom : Styles.iconBottom2}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Keranjang"
      component={KeranjangScreen}
      options={{
        tabBarLabel: 'Keranjang',
        tabBarIcon: (onfocus) => (
          <Image
            source={require('./src/assets/keranjang.png')}
            style={onfocus.focused ? Styles.iconBottom : Styles.iconBottom2}
          />
        )
      }}
      
    />
     <Tab.Screen
      name="Riwayat"
      component={RiwayatScreen}
      options={{
        tabBarLabel: 'Riwayat',
        tabBarIcon: (onfocus) => (
          <Image
            source={require('./src/assets/books.png')}
            style={onfocus.focused ? Styles.iconBottom : Styles.iconBottom2}
          />
        ),
      }}
    />
     <Tab.Screen
      name="Profil"
      component={ProfilScreen}
      options={{
        tabBarLabel: 'Profil',
        tabBarIcon: (onfocus) => (
          <Image
            source={require('./src/assets/profil.png')}
            style={onfocus.focused ? Styles.iconBottom : Styles.iconBottom2}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

function App() {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    isSkipLogin: false,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          isSkipLogin: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          isSkipLogin: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
          isSkipLogin: false,
        };
      case 'SKIP_LOGIN':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
          isSkipLogin: true,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser.token);
        const userEmail = foundUser.email;
        const userAccount = foundUser.account;

        try {
          let setdata = [
            ['email', userEmail],
            ['token', userToken],
            ['account', userAccount],
          ];
          await AsyncStorage.multiSet(setdata);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('email');
          await AsyncStorage.removeItem('account');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      skipLogin: async () => {
        dispatch({type: 'SKIP_LOGIN'});
      },
    }),
    [],
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
    
  }, []);


  const Container = () => {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={Blue} />
        <SafeAreaView style={{flex: 0, backgroundColor: Blue}} />
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            {loginState.userToken !== null ? (
              <Drawer.Navigator
                drawerContent={(props) => <DrawerScreen {...props} />}>
                {DrawerPublic()}
              </Drawer.Navigator>
            ) : loginState.isSkipLogin ? (
              <DrawerMenuSkipLogin />
            ) : (
              <RootStackScreen />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </>
    );
  };

  return <>{loginState.isLoading ? <SplashScreen /> : <Container />}</>;
}

export default App;