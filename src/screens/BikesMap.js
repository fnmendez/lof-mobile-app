import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import Mapbox from '@mapbox/react-native-mapbox-gl'

import { Bike, BluetoothWindow } from '../components'
import { getBikes, startTrip } from '../actions/bikes'
import { now } from '../helpers/parseDate'
import sleep from '../helpers/time'
import strToHexArr from '../helpers/stringToHex'
import {
  MAPBOX_TOKEN,
  mapboxConfig,
  secondsToUpdateBikesLocation,
} from '../constants'
import colors from '../styles'

Mapbox.setAccessToken(MAPBOX_TOKEN)

const isAndroid = Platform.OS === 'android'

const mapStateToProps = state => ({
  bikes: state.bikes.available,
  currentTrip: state.bikes.currentTrip,
  token: state.user.token,
  userBalance: state.user.balance,
})

const mapDispatchToProps = {
  getBikes,
  startTrip,
}

class BikesMap extends Component {
  // Initial state
  state = {
    bikesFetched: false,
    selectedBike: {},
    showBluetoothWindow: false,
    userLocation: null,
    updatedAt: null,
  }

  componentDidUpdate() {
    if (this.props.currentTrip !== null && this.props.navigation.isFocused()) {
      this.props.navigation.navigate('TripWindow')
    }
  }

  onUserLocationUpdate = ({ coords }) => {
    const { longitude, latitude } = coords
    this.setState({ userLocation: [longitude, latitude] })
    if (!this.state.bikesFetched) {
      this.props.getBikes({ latitude, longitude, token: this.props.token })
      this.setState({ bikesFetched: true, updatedAt: now() })
      sleep(this.onMapLongPress, 0) //
    }
  }

  shouldUpdateBikesLocation = () => {
    if (!this.state.updatedAt) return false
    const timeDifference = now() - this.state.updatedAt
    return timeDifference > secondsToUpdateBikesLocation
  }

  updateBikesLocation = () => {
    const coords = this.state.userLocation
    this.props.getBikes({
      longitude: coords[0],
      latitude: coords[1],
      token: this.props.token,
    })
    this.setState({ updatedAt: now() })
  }

  onMapLongPress = () => {
    if (this.state.userLocation) {
      this.map.flyTo(this.state.userLocation, 700)
    }
  }

  showBluetoothWindow = bluetoothParams => {
    this.setState({
      selectedBike: { ...bluetoothParams },
      showBluetoothWindow: true,
    })
  }

  hideBluetoothWindow = () => {
    this.setState({ showBluetoothWindow: false, selectedBike: {} })
  }

  onBikeUnlocked = () => {
    const { token } = this.props
    const { rubi_id } = this.state.selectedBike
    this.props.startTrip({ rubi_id, token })
  }

  onBikePress = bluetoothParams => {
    this.showBluetoothWindow(bluetoothParams)
  }

  renderBikeMarkers = bike => {
    const { rubi_id, coordinates, macAndroid, macIOS, hs1, hs2 } = bike
    return (
      <Bike
        key={rubi_id}
        rubi_id={rubi_id}
        selected={
          this.state.selectedBike && rubi_id === this.state.selectedBike.rubi_id
        }
        coordinates={coordinates}
        onPress={() =>
          this.onBikePress({ rubi_id, macAndroid, macIOS, hs1, hs2 })
        }
      />
    )
  }

  render() {
    const { rubi_id, macAndroid, macIOS, hs1, hs2 } = this.state.selectedBike
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <NavigationEvents
          onDidFocus={() => {
            StatusBar.setBarStyle('dark-content')
            this.onMapLongPress()
            if (this.shouldUpdateBikesLocation()) {
              this.updateBikesLocation()
            }
          }}
          onWillBlur={() => this.hideBluetoothWindow()}
        />
        {rubi_id && hs1 && hs2 && (
          <BluetoothWindow
            visible={this.state.showBluetoothWindow}
            requestOpenMode={true}
            onOutsideClick={this.hideBluetoothWindow}
            onActionFinished={this.onBikeUnlocked}
            blocked={this.props.userBalance <= 0}
            rubi_id={rubi_id}
            macAddress={isAndroid ? macAndroid : macIOS}
            firstHandshake={strToHexArr(hs1)}
            secondHandshake={strToHexArr(hs2)}
          />
        )}
        <Mapbox.MapView
          ref={m => (this.map = m)}
          styleURL={Mapbox.StyleURL.Light}
          style={styles.container}
          showUserLocation={true}
          userTrackingMode={2}
          onUserLocationUpdate={this.onUserLocationUpdate}
          onLongPress={this.onMapLongPress}
          {...mapboxConfig}
        >
          <>{this.props.bikes.map(this.renderBikeMarkers)}</>
        </Mapbox.MapView>
        <View style={styles.testContainer}>
          <View style={styles.test}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onMapLongPress}
            >
              <Text style={styles.buttonText}>Centrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

BikesMap.propTypes = {
  bikes: PropTypes.array.isRequired,
  currentBike: PropTypes.object,
  currentTrip: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.PW,
    borderRadius: 5,
    padding: 5,
  },
  testContainer: {
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BikesMap)
