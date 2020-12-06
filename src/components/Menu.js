import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  RefreshControl,
  ImageBackground,
  Modal,
  TouchableHighlight,
} from 'react-native';

export const MenuSkipLogin = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '60%',
        minHeight: 200,
        position: 'absolute',
        top: 0,
        left: 0,
        paddingHorizontal: 10,
        paddingBottom: 10,
      }}>
      <TouchableHighlight
        style={{width: '100%', backgroundColor: 'white', paddingVertical: 5}}
        underlayColor="grey"
        onPress={() => navigation.navigate('SkipLogin')}>
        <Text style={{fontSize: 15}}>Skip Login</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{width: '100%', backgroundColor: 'white', paddingVertical: 5}}
        underlayColor="grey"
        onPress={() => navigation.navigate('JadwalIbadah')}>
        <Text style={{fontSize: 15}}>Tentang MCC</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{width: '100%', backgroundColor: 'white', paddingVertical: 5}}
        underlayColor="grey"
        onPress={() => navigation.navigate('ProfileGembala')}>
        <Text style={{fontSize: 15}}>Profil Gembala</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{width: '100%', backgroundColor: 'white', paddingVertical: 5}}
        underlayColor="grey"
        onPress={() => navigation.navigate('JadwalIbadah')}>
        <Text style={{fontSize: 15}}>Jadwal Ibadah</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{width: '100%', backgroundColor: 'white', paddingVertical: 5}}
        underlayColor="grey"
        onPress={() => navigation.navigate('Kegiatan')}>
        <Text style={{fontSize: 15}}>Kegiatan</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{width: '100%', backgroundColor: 'white', paddingVertical: 5}}
        underlayColor="grey"
        onPress={() => navigation.navigate('HomeCell')}>
        <Text style={{fontSize: 15}}>HOME (Cell Group)</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{width: '100%', backgroundColor: 'white', paddingVertical: 5}}
        underlayColor="grey"
        onPress={() => navigation.navigate('HomeCell')}>
        <Text style={{fontSize: 15}}>Encounter</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{width: '100%', backgroundColor: 'white', paddingVertical: 5}}
        underlayColor="grey"
        onPress={() => navigation.navigate('Login')}>
        <Text style={{fontSize: 15}}>Login</Text>
      </TouchableHighlight>
    </View>
  );
};
