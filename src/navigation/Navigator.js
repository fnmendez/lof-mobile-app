/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import FA from 'react-native-vector-icons/FontAwesome'
import FT from 'react-native-vector-icons/Feather'
import MC from 'react-native-vector-icons/MaterialCommunityIcons'
import MI from 'react-native-vector-icons/MaterialIcons'

import {
  BikesMap,
  ConfirmAccount,
  History,
  Main,
  Profile,
  Register,
  SessionManager,
  TripFinished,
  TripWindow,
} from '../screens/'
import colors from '../styles'

const Tabs = createBottomTabNavigator(
  // Screens
  {
    BikesMap: {
      screen: BikesMap,
      navigationOptions: {
        tabBarLabel: 'Mapa',
        tabBarIcon: ({ tintColor }) => (
          <FA name="map" color={tintColor} size={26} />
        ),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'Historial',
        tabBarIcon: ({ tintColor }) => (
          <MC name="history" color={tintColor} size={32} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ tintColor }) => (
          <MI name="person" color={tintColor} size={42} />
        ),
      },
    },
  },
  // Options
  {
    initialRouteName: 'BikesMap',
    order: ['History', 'BikesMap', 'Profile'],
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.PuertoRico,
      style: {
        backgroundColor: colors.Mirage,
      },
    },
  }
)

const AuthStack = createStackNavigator(
  // Authentication screens
  {
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
        title: 'Ingreso',
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: null,
        headerLeft: ({ onPress }) => (
          <FT
            name="chevron-left"
            onPress={onPress}
            style={{ marginLeft: 14, fontSize: 26, color: colors.White }}
          />
        ),
      },
    },
    ConfirmAccount: {
      screen: ConfirmAccount,
      navigationOptions: {
        header: null,
        title: 'Confirma tu cuenta',
      },
    },
  },
  // Options
  {
    navigationOptions: {
      initialRouteName: 'Main',
      headerStyle: {
        backgroundColor: colors.PuertoRico,
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  }
)

const MainStack = createStackNavigator(
  // Tabs and Trips screens
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
    TripWindow: {
      screen: TripWindow,
      navigationOptions: {
        header: null,
        title: 'Viaje actual',
      },
    },
    TripFinished: {
      screen: TripFinished,
      navigationOptions: {
        title: null,
        headerLeft: ({ onPress }) => (
          <FT
            name="chevron-left"
            onPress={onPress}
            style={{ marginLeft: 14, fontSize: 26, color: colors.White }}
          />
        ),
      },
    },
  },
  // Options
  {
    navigationOptions: {
      initialRouteName: 'SessionManager',
      headerStyle: {
        backgroundColor: colors.PuertoRico,
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  }
)

const AppNavigator = createSwitchNavigator(
  {
    SessionManager: {
      screen: SessionManager,
      navigationOptions: {
        header: null,
        title: null,
      },
    },
    AuthStack,
    MainStack,
  },
  { initialRouteName: 'SessionManager' }
)

export default AppNavigator
