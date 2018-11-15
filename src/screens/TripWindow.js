import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { BluetoothWindow, TripInfo } from '../components'
import { returnBike } from '../actions/bikes'
import strToHexArr from '../helpers/stringToHex'
import colors from '../styles'

const mapStateToProps = state => ({
  currentTrip: state.bikes.currentTrip,
  loading: state.bikes.loading,
  token: state.user.token,
})

const mapDispatchToProps = {
  returnBike,
}

class TripWindow extends Component {
  // Initial state
  state = {
    showBluetoothWindow: false,
    message: '',
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
    this.props.returnBike({
      tripId: this.props.currentTrip.tripId,
      token: this.props.token,
    })
  }

  showFinishTripTutorial = () => {
    this.setState({ message: '' })
    this.props.navigation.navigate('FinishTripTutorial')
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
            macAddress={Platform.OS === 'ios' ? macIOS : macAndroid}
            firstHandshake={strToHexArr(hs1)}
            secondHandshake={strToHexArr(hs2)}
          />
        )}
        <Text style={styles.title}>Tu viaje actual</Text>
        {this.props.currentTrip && (
          <TripInfo
            startedAt={this.props.currentTrip.startedAt}
            bike={this.props.currentTrip.bike}
          />
        )}
        <Text style={styles.message}>{this.state.message}</Text>
        {!this.props.loading && (
          <TouchableOpacity
            style={styles.finishTripButtonContainer}
            onPress={this.showBluetoothWindow}
          >
            <Text style={styles.buttonText}>Terminar viaje</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.tutorialButtonContainer}
          onPress={this.showFinishTripTutorial}
        >
          <Text style={styles.buttonText}>Cómo terminar mi viaje</Text>
        </TouchableOpacity>
        {this.props.loading && (
          <ActivityIndicator size="large" color={colors.YO} />
        )}
      </View>
    )
  }
}

TripWindow.propTypes = {
  currentTrip: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  returnBike: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BK,
  },
  title: {
    fontSize: 25,
    textAlign: 'left',
    color: colors.W,
  },
  message: {
    fontSize: 20,
    color: colors.YO,
    marginBottom: 10,
  },
  finishTripButtonContainer: {
    width: 250,
    borderRadius: 8,
    backgroundColor: colors.B,
    paddingVertical: 10,
    marginBottom: 10,
  },
  tutorialButtonContainer: {
    width: 250,
    borderRadius: 8,
    backgroundColor: colors.GN,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.W,
    fontWeight: '700',
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripWindow)
