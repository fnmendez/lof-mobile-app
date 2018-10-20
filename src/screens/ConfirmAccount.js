import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import colors from '../styles'

const mapStateToProps = state => ({
  username: state.user.username,
})

const ConfirmAccount = ({ navigation, username }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to ConfirmAccount, {username}!</Text>
    <Text style={styles.link} onPress={() => navigation.navigate('Tabs')}>
      Tabs
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BG,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

ConfirmAccount.propTypes = {
  username: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(ConfirmAccount)