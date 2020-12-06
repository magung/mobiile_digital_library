import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import {Styles, White} from '../styles/style';

export const MLoading = ({visible}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={Styles.modalBg} />
      <View style={Styles.modalBody}>
        <ActivityIndicator size="large" color={White} />
      </View>
    </Modal>
  );
};
