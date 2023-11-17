import React from 'react';
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import {ColorPalette} from '../../utils/colors';

const Loader = () => (
  <Modal transparent={true} animationType={'none'} visible={true}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={ColorPalette.primary}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
