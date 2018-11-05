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
import Mapbox from '@mapbox/react-native-mapbox-gl'

import { Bike, BluetoothWindow } from '../components'
import { getBikes } from '../actions/bikes'
import strToHexArr from '../helpers/stringToHex'
import { MAPBOX_TOKEN, mapboxConfig } from '../constants'
import colors from '../styles'

Mapbox.setAccessToken(MAPBOX_TOKEN)

const mapStateToProps = state => ({
  token: state.user.token,
  bikes: state.bikes.available,
})

const mapDispatchToProps = {
  getBikes,
}

class BikesMap extends Component {
  // Initial state
  state = {
    userLocation: null,
    showBluetoothWindow: false,
    bikesFetched: false,
    selectedBike: {},
  }

  onUserLocationUpdate = ({ coords }) => {
    const { longitude, latitude } = coords
    this.setState({ userLocation: [longitude, latitude] })
    if (!this.state.bikesFetched) {
      this.props.getBikes({ latitude, longitude, token: this.props.token })
      this.setState({ bikesFetched: true })
    }
  }

  onMapLongPress = () => {
    if (this.state.userLocation) this.map.flyTo(this.state.userLocation, 500)
  }

  showBluetoothWindow = bluetoothParams => {
    this.setState({
      selectedBike: { ...bluetoothParams },
      showBluetoothWindow: true,
    })
  }

  hideBluetoothWindow = () => {
    this.setState({
      showBluetoothWindow: false,
    })
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
        <StatusBar barStyle="light-content" />
        {rubi_id &&
          hs1 &&
          hs2 && (
            <BluetoothWindow
              visible={this.state.showBluetoothWindow}
              onOutsideClick={this.hideBluetoothWindow}
              rubi_id={rubi_id}
              macAddress={Platform.OS === 'ios' ? macIOS : macAndroid}
              firstHandshake={strToHexArr(hs1)}
              secondHandshake={strToHexArr(hs2)}
            />
          )}
        <Mapbox.MapView
          ref={c => (this.map = c)}
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
              <Text style={styles.buttonText}>Test</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

BikesMap.propTypes = {
  token: PropTypes.string.isRequired,
  bikes: PropTypes.array.isRequired,
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
    height: 30,
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
