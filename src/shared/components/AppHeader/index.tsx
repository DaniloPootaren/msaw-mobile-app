import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import HamburgerIcon from '../../../assets/icons/hamburger.svg';
import ProfileIcon from '../../../assets/icons/profile.svg';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../redux';
import {clearAuth} from '../../../redux/slices/auth';
import {Box, Text} from 'native-base';
import {ColorPalette} from '../../utils/colors';

interface Props {
  title: string;
}

const AppHeader = (props: Props) => {
  const {title} = props;
  const navigation = useNavigation();

  const handleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  // TODO: Remove when profile is implemented
  const dispatch = useAppDispatch();
  return (
    <Box style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={handleDrawer}>
        <HamburgerIcon />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => dispatch(clearAuth())}>
        <ProfileIcon />
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: ColorPalette.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  touchable: {
    justifyContent: 'space-between',
    alignItems: 'center',
    fleDirection: 'row',
    padding: 10,
  },
  title: {
    position: 'absolute',
    marginLeft: 60,
    fontSize: 16,
    fontWeight: '400',
    color: ColorPalette.primary,
  },
});

export default AppHeader;
