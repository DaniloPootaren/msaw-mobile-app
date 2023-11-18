import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet} from 'react-native';
import SplashScreenImage from '../../assets/images/splashscreen.png';
import MsawLogo from '../../assets/images/msaw-logo-white.png';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../shared/enums';
import {openLink} from '../../shared/utils/browser';
import {MAUPASS_ACCOUNT_REGISTRATION_URL} from '../../shared/utils/maupass';
import {StatusBar} from 'react-native';
import {Button, Text, VStack} from 'native-base';
import {ColorPalette} from '../../shared/utils/colors';

const PreLoginScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    StatusBar.setHidden(true);

    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={SplashScreenImage}
      resizeMode="cover">
      <VStack
        style={styles.action}
        space="xl"
        width="100%"
        justifyContent="center"
        alignItems="center">
        <Image source={MsawLogo} style={styles.image} />
        <Button
          width="100%"
          backgroundColor={ColorPalette.white}
          style={styles.button}
          onPress={() => navigation.navigate(RouteName.LOGIN)}>
          <Text style={styles.loginLabel} color={ColorPalette.primary}>
            Login
          </Text>
        </Button>
        <Button
          width="100%"
          borderColor={ColorPalette.white}
          variant="outline"
          style={styles.button}
          onPress={() => openLink(MAUPASS_ACCOUNT_REGISTRATION_URL)}>
          <Text style={styles.loginLabel} color={ColorPalette.white}>
            Sign Up
          </Text>
        </Button>
      </VStack>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  action: {
    position: 'absolute',
    bottom: '10%',
  },
  loginLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {},
  image: {
    marginBottom: 100,
  },
});

export default PreLoginScreen;
