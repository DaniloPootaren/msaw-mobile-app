/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SplashScreen from '../screens/Splash';
import {RouteName} from '../shared/enums';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryScreen from '../screens/History';
import SurveyScreen from '../screens/Survey';

import HomeIcon from '../assets/icons/home-unselected.svg';
import SelectedHomeIcon from '../assets/icons/home-selected.svg';

import SurveyIcon from '../assets/icons/survey-unselected.svg';
import SelectedSurveyIcon from '../assets/icons/survey-selected.svg';

import HistoryIcon from '../assets/icons/history-unselected.svg';
import SelectedHistoryIcon from '../assets/icons/history-selected.svg';
import AppHeader from '../shared/components/AppHeader';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/Login';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {navigationRef} from '../shared/utils/navigation';
import SurveyForm from '../screens/SurveyForm';
import {Text, View} from 'native-base';
import {ColorPalette} from '../shared/utils/colors';
import PreLoginScreen from '../screens/PreLogin';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(_props: any) => (
        <View>
          <Text>Drawer Content Component</Text>
        </View>
      )}
      screenOptions={{
        headerShown: false,
        drawerAllowFontScaling: false,
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        drawerStyle: {width: '80%'},
        drawerType: 'front',
        swipeEnabled: false,
        headerShadowVisible: true,
        drawerHideStatusBarOnOpen: true,
        freezeOnBlur: true,
        unmountOnBlur: true,
      }}>
      <Drawer.Screen name="BottomNavigation" component={TabNavigation} />
    </Drawer.Navigator>
  );
};

const StackNavigation = () => {
  const isAuthenticated = !!useSelector(
    (state: RootState) => state.auth.data?.access_token,
  );
  const hasRole = !!useSelector((state: RootState) => state.auth.me?.data.role);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={RouteName.SPLASH}>
      {isAuthenticated && hasRole ? (
        <>
          <Stack.Screen name={RouteName.HOME} component={DrawerNavigation} />
          <Stack.Screen
            name={RouteName.SURVEY_FORM}
            component={SurveyForm}
            options={{headerShown: true}}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={RouteName.SPLASH} component={SplashScreen} />
          <Stack.Screen name={RouteName.PRE_LOGIN} component={PreLoginScreen} />
          <Stack.Screen name={RouteName.LOGIN} component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={RouteName.HOME_PAGE}
      screenOptions={{
        headerShown: true,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: ColorPalette.primary,
        tabBarLabelStyle: {
          marginBottom: 5,
        },
        header: props => <AppHeader title={props.route.name} />,
      }}>
      <Tab.Screen
        name={RouteName.HOME_PAGE}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) =>
            focused ? <SelectedHomeIcon /> : <HomeIcon />,
        }}
      />
      <Tab.Screen
        name={RouteName.SURVEY}
        component={SurveyScreen}
        options={{
          tabBarLabel: 'New Survey',
          tabBarIcon: ({focused}) =>
            focused ? <SelectedSurveyIcon /> : <SurveyIcon />,
        }}
      />
      <Tab.Screen
        name={RouteName.HISTORY}
        component={HistoryScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <SelectedHistoryIcon /> : <HistoryIcon />,
        }}
      />
    </Tab.Navigator>
  );
};

const Routing = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Routing;
