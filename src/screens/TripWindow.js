import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { BluetoothWindow, LockTutorial, TripInfo } from '../components'
import { finishTrip } from '../actions/bikes'
import isAndroid from '../helpers/platform'
import strToHexArr from '../helpers/stringToHex'
import colors, { logoSmall, mainContainerStyle } from '../styles'

const mapStateToProps = state => ({
  currentTrip: state.bikes.currentTrip,
  loading: state.bikes.loading,
  token: state.user.token,
})

const mapDispatchToProps = {
  finishTrip,
}

class TripWindow extends Component {
  // Initial state
  state = {
    message: '',
    showBluetoothWindow: false,
    showLockTutorial: false,
  }

  componentDidMount() {
    this.onFocusHandler = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content')
    })
    this.onBlurHandler = this.props.navigation.addListener(
      'willBlur',
      this.hideBluetoothWindow
    )
  }

  componentWillUnmount() {
    this.onFocusHandler.remove()
    this.onBlurHandler.remove()
  }

  showBluetoothWindow = () => {
    this.setState({ showBluetoothWindow: true })
  }

  hideBluetoothWindow = () => {
    this.setState({ showBluetoothWindow: false })
  }

  handleFinishTrip = () => {
    this.props.finishTrip({ token: this.props.token })
  }

  showLockTutorial = () => {
    this.setState({ message: '', showLockTutorial: true })
  }

  hideLockTutorial = () => {
    this.setState({ showLockTutorial: false })
  }

  onUnlockError = () => {
    this.setState({
      showBluetoothWindow: false,
      message: 'No se ha podido terminar el viaje',
    })
  }

  render() {
    const { macAndroid, macIOS, hs1, hs2 } = this.props.currentTrip.bike
    return (
      <View style={styles.container}>
        {hs1 && hs2 && (
          <BluetoothWindow
            visible={this.state.showBluetoothWindow}
            requestOpenMode={false}
            onOutsideClick={this.hideBluetoothWindow}
            onActionFinished={this.handleFinishTrip}
            onActionError={this.onUnlockError}
            macAddress={isAndroid ? macAndroid : macIOS}
            firstHandshake={strToHexArr(hs1)}
            secondHandshake={strToHexArr(hs2)}
          />
        )}
        <LockTutorial
          visible={this.state.showLockTutorial}
          onOutsideClick={this.hideLockTutorial}
        />
        <Image
          source={require('../styles/logo/logos-02.png')}
          style={logoSmall}
        />
        <Text style={styles.title}>Tu viaje actual</Text>
        {this.props.currentTrip && (
          <TripInfo
            startedAt={this.props.currentTrip.startedAt}
            bike={this.props.currentTrip.bike}
          />
        )}
        <Text style={styles.message}>{this.state.message}</Text>
        <TouchableOpacity
          style={styles.tutorialButtonContainer}
          onPress={this.showLockTutorial}
        >
          <Text style={styles.buttonText}>Cómo termino mi viaje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.finishTripButtonContainer}
          onPress={this.showBluetoothWindow}
        >
          <Text style={styles.buttonText}>Terminar viaje</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

TripWindow.propTypes = {
  currentTrip: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  finishTrip: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    ...mainContainerStyle,
  },
  title: {
    fontSize: isAndroid ? 25 : 30,
    textAlign: 'left',
    marginTop: 20,
    color: colors.White,
  },
  message: {
    fontSize: 20,
    color: colors.Punch,
    marginBottom: 10,
  },
  finishTripButtonContainer: {
    width: 250,
    borderRadius: 8,
    backgroundColor: colors.Punch,
    paddingVertical: 10,
  },
  tutorialButtonContainer: {
    width: 250,
    borderRadius: 8,
    backgroundColor: colors.LilacBush,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.White,
    fontWeight: '700',
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripWindow)
