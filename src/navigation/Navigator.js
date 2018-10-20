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
  SignUp,
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
    tabBarPosition: 'top',
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
    Main: { screen: Main },
    SignUp: { screen: SignUp },
    ConfirmAccount: { screen: ConfirmAccount },
    Tabs: { screen: Tabs },
  },
  // Options
  {
    headerMode: 'none',
    mode: 'modal',
  }
)

export default StackNavigator
