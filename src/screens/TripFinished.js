import React, { Component } from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import colors, { mainContainerStyle, logoLarge } from '../styles'

class TripFinished extends Component {
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content')
    })
  }

  componentWillUnmount() {
    this.navListener.remove()
  }

  render() {
    return (
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <Image
            source={require('../styles/logo/logos-01.png')}
            style={logoLarge}
          />
          <Text style={styles.text}>¡Viaje Finalizado!</Text>
        </View>
      </View>
    )
  }
}

TripFinished.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  topContainer: {
    ...mainContainerStyle,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 160,
  },
  text: {
    color: colors.White,
    fontSize: 30,
    marginTop: -60,
    textAlign: 'center',
  },
})

export default TripFinished
