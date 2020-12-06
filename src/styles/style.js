import {StyleSheet, Dimensions} from 'react-native';

export const Blue = '#5784C4';
export const White = '#FFFFFF';
export const Grey = '#EEEEEE';
export const Black = '#000000';
export const Red = '#FF0000';
export const Orange = '#DFA519';
export const Primary = '#5784C4';
export const Yellow = '#FBF251';

//font-size
export const font_larger = 22;
export const font_large = 18;
export const font_normal = 15;
export const font_small = 12;
export const font_very_small = 9;

//icon
export const icon_small = 16;
export const icon_normal = 24;
export const icon_large = 36;
export const icon_larger = 48;
export const icon_largerx = 72;
export const icon_largerxx = 96;
export const icon_largerxxx = 114;

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

export const Styles = StyleSheet.create({
  vDaftar: {
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  btnLewati: {
    borderRadius: 25,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: Black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    borderRadius: 25,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: Primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputPass: {
    height: 50,
    paddingLeft: 40,
    fontSize: font_large,
    paddingRight: 25,
  },
  textInput: {height: 50, paddingLeft: 40, fontSize: font_large},
  icTextIn: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
  },
  icSearch: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  icQR: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  vTextInput: {
    borderWidth: 2,
    borderColor: Black,
    borderRadius: 25,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  vTextInputTop: {
    borderWidth: 2,
    borderColor: Black,
    borderRadius: 25,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  rowCenter: {flexDirection: 'row', alignSelf: 'center'},
  icLogin: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
    resizeMode: 'contain',
    marginTop: 40,
  },
  icProfile: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
    resizeMode: 'cover',
    top: 20,
    borderRadius: 100,
  },
  icProfileDefault: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
    resizeMode: 'cover',
    top: 20,
    borderRadius: 100,
    position: 'absolute',
  },
  garisDrawer: {
    width: '100%',
    borderBottomWidth: 1,
    marginVertical: 10,
    borderBottomColor: Grey,
  },
  icDrawer: {width: 30, height: 30, marginRight: 10},
  container: {
    // backgroundColor: White,
    width: '100%',
    height: '100%',
  },
  containerWhite: {
    backgroundColor: White,
    width: '100%',
    height: '100%',
  },
  containerStudentID: {
    backgroundColor: Grey,
    width: '100%',
    height: '100%',
  },
  splashBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSplashBg: {
    width: '70%',
    height: '20%',
    resizeMode: 'contain',
    position: 'absolute',
    top: '30%',
  },
  buttonRegistration: {
    width: '90%',
    height: 120,
    backgroundColor: Blue,
    alignSelf: 'center',
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  txtBtnRegistration: {
    color: White,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 5,
  },
  buttonLogin: {
    minWidth: '50%',
    minHeight: 40,
    backgroundColor: Yellow,
    alignSelf: 'center',
    margin: 20,
    padding: 5,
    borderRadius: 30,
  },
  txtBtnLogin: {
    color: Black,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 5,
  },
  bgLogin: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logoLogin: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
  },
  inputLogin: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
    height: 40,
    backgroundColor: White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInputLogin: {
    borderBottomColor: Blue,
    borderBottomWidth: 2,
    width: '90%',
    marginLeft: 10,
    height: 40,
    fontSize: 15,
  },
  icStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  icSee: {
    position: 'absolute',
    right: 20,
  },
  btnClickHere: {
    width: '50%',
    minHeight: 40,
    backgroundColor: White,
    alignSelf: 'center',
    margin: 10,
    padding: 5,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputEmail: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderColor: Blue,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: White,
    height: 40,
    alignItems: 'center',
  },
  vTextInputPass: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: Blue,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: White,
    height: 40,
    alignItems: 'center',
  },
  modalBg: {
    backgroundColor: Black,
    opacity: 0.5,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInputRegister: {
    borderBottomColor: Blue,
    borderBottomWidth: 2,
    width: '100%',
    height: 40,
    fontSize: 15,
    marginBottom: 10,
  },
  radioRegister: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  txtRegister: {
    fontWeight: 'bold',
    color: Orange,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 15,
  },
  drawerBtn: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingVertical: 8,
    backgroundColor: White,
    alignItems: 'center',
  },
  drawerTxt: {
    fontSize: 15,
    color: Black,
    fontWeight: 'bold',
  },
  iconBottom: {
    width: icon_normal,
    resizeMode: 'contain',
    height: icon_normal,
    margin: 10,
  },
  iconBottom2: {
    width: icon_normal,
    resizeMode: 'contain',
    height: icon_normal,
    margin: 10,
    opacity: 0.5,
  },
  icNotif: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  imgProfile: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  posAbs60r: {
    right: 60,
    position: 'absolute',
  },
  posAbs20r: {
    right: 20,
    position: 'absolute',
  },
  posAbs20l: {
    left: 20,
    position: 'absolute',
  },
  posAbs20rl: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  viewSkipLogin: {
    width: '100%',
    alignItems: 'center',
    minHeight: '100%',
  },
  btnLoginSkipLogin: {
    height: 60,
    backgroundColor: Orange,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightScreen - 260,
  },
  txtLargerWhite: {
    fontSize: font_larger,
    color: White,
  },
  viewHeader: {
    backgroundColor: White,
    height: 60,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
  },
  icMenu: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  txtLarge: {
    fontSize: font_large,
    marginLeft: 70,
  },
  containerProfile: {
    width: '100%',
    alignItems: 'center',
  },
  viewProfile1: {
    flexDirection: 'row',
    padding: 20,
    width: '100%',
  },
  imgProfile1: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  icCamera: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 50,
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  marginLeft20c: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  fontLarger: {
    fontSize: font_larger,
  },
  viewProfile2: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 20,
    width: widthScreen - 40,
    borderTopWidth: 2,
    borderColor: Grey,
  },
  width50PRow: {
    width: '50%',
    flexDirection: 'row',
  },
  icReward: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  alignCenterPl5: {
    alignItems: 'center',
    paddingLeft: 5,
  },
  fontLarge: {
    fontSize: font_large,
  },
  fontSmall: {
    fontSize: font_small,
  },
  viewBtnProfiles: {
    flexDirection: 'row',
    paddingVertical: 20,
    width: widthScreen - 40,
    borderTopWidth: 2,
    borderColor: Grey,
  },
  justifyCenterWidth100: {
    justifyContent: 'center',
    width: '100%',
  },
  icNext: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 0,
    resizeMode: 'contain',
  },
});
