import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, Text } from 'react-native'

import isAndroid from '../helpers/platform'
import colors, { logoSmall } from '../styles'

const ProfileHeader = props => {
  const { mail } = props
  return (
    <>
      <Image
        source={require('../styles/logo/logos-02.png')}
        style={logoSmall}
      />
      <Text style={styles.mail}>{mail}</Text>
    </>
  )
}

ProfileHeader.propTypes = {
  mail: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  mail: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: isAndroid ? '200' : '500',
    color: colors.White,
    textAlign: 'center',
  },
})

export default ProfileHeader
