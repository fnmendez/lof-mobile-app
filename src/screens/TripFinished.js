import React, { Component } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../styles'

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
      <View style={styles.container}>
        <Text style={styles.text}>¡Viaje Finalizado!</Text>
      </View>
    )
  }
}

TripFinished.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BG,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

export default TripFinished
