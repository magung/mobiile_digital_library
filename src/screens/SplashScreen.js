import React from 'react';
import {View, Image, Text, StatusBar, ImageBackground} from 'react-native';
import {Styles, Orange} from '../styles/style';
const SplashScreen = (props) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={Styles.splashBg}
        resizeMode='cover'>
        <Image
          source={require('../assets/knowledge.png')}
          style={Styles.imgSplashBg}
        />
      </ImageBackground>
    </View>
  );
};
export default SplashScreen;
