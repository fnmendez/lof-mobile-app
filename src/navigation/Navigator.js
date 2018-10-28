/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import AD from 'react-native-vector-icons/AntDesign'
import MC from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  Main,
  Register,
  ConfirmAccount,
  BikesMap,
  History,
  Profile,
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
        backgroundColor: colors.BK,
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
        title: 'Registro',
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
  },
  // Options
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.BK,
      },
    },
  }
)

export default StackNavigator
