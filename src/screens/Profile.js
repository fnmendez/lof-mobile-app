import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import colors from '../styles'

const mapStateToProps = state => ({
  mail: state.user.mail,
})

const Profile = ({ mail }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to Profile, {mail}!</Text>
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

Profile.propTypes = {
  mail: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(Profile)
