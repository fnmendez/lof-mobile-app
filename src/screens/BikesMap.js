import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { getBikes } from '../actions/bikes'
import { MAPBOX_TOKEN, mapboxConfig } from '../constants'
import colors from '../styles'

Mapbox.setAccessToken(MAPBOX_TOKEN)

const mapStateToProps = state => ({
  token: state.user.token,
  bikes: state.bikes.bikes,
})

const mapDispatchToProps = {
  getBikes,
}

class BikesMap extends Component {
  state = {
    userLocation: null,
    bikesFetched: false,
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

  renderBikeMarkers = bike => (
    <Mapbox.PointAnnotation
      id={String(bike.rubi_id)}
      key={bike.rubi_id}
      coordinate={bike.coordinates}
    >
      <Icon
        name="directions-bike"
        color={'black'}
        size={30}
        onPress={() => alert(`This is ${bike.rubi_id}`)}
      />
    </Mapbox.PointAnnotation>
  )

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BikesMap)
