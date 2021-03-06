import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, View } from 'react-native'

import isAndroid from '../helpers/platform'
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
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  textContainer: {
    backgroundColor: colors.White,
    paddingLeft: 20,
    justifyContent: 'center',
    height: 55,
    marginHorizontal: 35,
    borderRadius: 15,
    marginTop: 7,
  },
  label: {
    color: colors.Mirage,
    fontWeight: isAndroid ? '200' : '400',
    fontSize: isAndroid ? 17 : 20,
  },
  text: {
    color: colors.G,
    fontWeight: isAndroid ? '200' : '400',
    fontSize: isAndroid ? 17 : 20,
  },
})

export default UserInfo
