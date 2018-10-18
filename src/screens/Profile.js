import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import colors from '../styles'

const mapStateToProps = state => ({
  username: state.user.username,
})

const ProfileScreen = ({ username }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome {username}</Text>
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={this.validateUsername}
    >
      <Text style={styles.buttonText}>Abrir candado</Text>
    </TouchableOpacity>
  </View>
)

ProfileScreen.navigationOptions = {
  title: 'Profile',
}

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
  buttonContainer: {
    width: 250,
    borderRadius: 8,
    backgroundColor: colors.B,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.W,
    fontWeight: '700',
  },
})

ProfileScreen.propTypes = {
  username: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(ProfileScreen)
