/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import AD from 'react-native-vector-icons/AntDesign'
import MC from 'react-native-vector-icons/MaterialCommunityIcons'
import FT from 'react-native-vector-icons/Feather'

import {
  BikesMap,
  ConfirmAccount,
  FinishTripTutorial,
  History,
  Main,
  Profile,
  Register,
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
          <MC name="map-search" color={tintColor} size={24} />
        ),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'Historial',
        tabBarIcon: ({ tintColor }) => (
          <MC name="history" color={tintColor} size={24} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ tintColor }) => (
          <AD name="user" color={tintColor} size={24} />
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
      tintColor: colors.DB,
      style: {
        backgroundColor: colors.PBK,
      },
    },
  }
)

const StackNavigator = createStackNavigator(
  // Screens
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
            style={{ marginLeft: 14, fontSize: 26, color: colors.W }}
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
    FinishTripTutorial: {
      screen: FinishTripTutorial,
      navigationOptions: {
        title: null,
        headerLeft: ({ onPress }) => (
          <FT
            name="chevron-left"
            onPress={onPress}
            style={{ marginLeft: 14, fontSize: 26, color: colors.W }}
          />
        ),
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
            style={{ marginLeft: 14, fontSize: 26, color: colors.W }}
          />
        ),
      },
    },
  },
  // Options
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.BK,
        borderBottomWidth: 0,
      },
    },
  }
)

export default StackNavigator
