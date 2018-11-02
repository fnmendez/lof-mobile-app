import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../styles'

const UserIcon = props => {
  const { mail } = props
  return (
    <>
      <Icon name="account-circle" color={colors.BG} size={130} />
      <Text style={styles.mail}>{mail}</Text>
    </>
  )
}

UserIcon.propTypes = {
  mail: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  mail: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.PW,
    textAlign: 'center',
  },
})

export default UserIcon
