import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAvoidingView, Text, StyleSheet, View } from 'react-native'

import { Login } from '../components'
import colors from '../styles'

const MainScreen = props => (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    <Text style={styles.title}>LOF</Text>
    <Login />
    <View style={styles.textContainer}>
      <Text style={styles.text}>¿No tienes cuenta? Crea una </Text>
      <Text
        style={styles.link}
        onPress={() => props.navigation.navigate('Register')}
      >
        acá
      </Text>
    </View>
  </KeyboardAvoidingView>
)

MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BK,
  },
  title: {
    fontSize: 50,
    color: colors.W,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  text: {
    color: colors.W,
  },
  link: {
    color: colors.B,
  },
})

export default MainScreen
