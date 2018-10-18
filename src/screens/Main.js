import React from 'react'
import { StyleSheet, View } from 'react-native'
import Login from '../components/Login'
import colors from '../styles'

const MainScreen = () => (
  <View style={styles.container}>
    <Login />
  </View>
)

MainScreen.navigationOptions = {
  title: 'Ingresa a tu cuenta',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BK,
  },
})

export default MainScreen
