/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {dispatchMultipleActions} from '../../shared/utils/store';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../shared/enums';
import ProgressBar from '../../shared/components/ProgressBar';
import Background from '../../assets/images/splashscreen.png';
import {appDataAction} from '../../redux/actions/appData';

const AppLoaderScreen = () => {
  const isAuthenticated = !!useSelector((state: RootState) => state).auth.data
    .access_token;

  const [percentageLoaded, setPercentageLoaded] = useState(0);
  const navigation = useNavigation<any>();
  const requiredData = [appDataAction.getBreeds(), appDataAction.getSurveys()];
  const percentagePerItem = 100 / requiredData.length;

  const loadData = () => {
    dispatchMultipleActions(requiredData, () => {
      setPercentageLoaded(prevPercentage => prevPercentage + percentagePerItem);
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      return loadData();
    } else {
      navigation.navigate(RouteName.PRE_LOGIN);
    }

    return () => setPercentageLoaded(0);
  }, [isAuthenticated, navigation]);

  const initAppRedirection = (): void => {
    if (isAuthenticated) {
      navigation.navigate(RouteName.HOME);
    } else {
      navigation.navigate(RouteName.SPLASH);
    }
  };

  useEffect(() => {
    if (percentageLoaded === 100) {
      setTimeout(() => initAppRedirection(), 1000);
    }
  }, [percentageLoaded]);

  return (
    <ImageBackground source={Background} style={[styles.container]}>
      <View style={styles.progressBar}>
        <ProgressBar progress={percentageLoaded} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
  },
});

export default AppLoaderScreen;
