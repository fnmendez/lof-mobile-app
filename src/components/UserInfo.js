import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, View } from 'react-native'

import colors from '../styles'

const UserInfo = props => {
  const { balance, firstName, lastName } = props
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.text}>{firstName}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Apellido</Text>
        <Text style={styles.text}>{lastName}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Saldo</Text>
        <Text style={styles.text}>$ {balance}</Text>
      </View>
    </View>
  )
}

UserInfo.propTypes = {
  balance: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'stretch',
  },
  textContainer: {
    backgroundColor: colors.BG,
    paddingLeft: 20,
    justifyContent: 'center',
    height: 55,
    marginTop: 2,
  },
  label: {
    color: colors.BK,
    fontSize: 22,
  },
  text: {
    color: colors.DG,
    fontSize: 22,
  },
})

export default UserInfo
