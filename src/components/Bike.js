import React from 'react'
import PropTypes from 'prop-types'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Bike = props => {
  const { rubi_id, coordinates, onPress } = props
  return (
    <Mapbox.PointAnnotation id={String(rubi_id)} coordinate={coordinates}>
      <Icon
        name="directions-bike"
        color={'black'}
        size={30}
        onPress={onPress}
      />
    </Mapbox.PointAnnotation>
  )
}

Bike.propTypes = {
  rubi_id: PropTypes.number.isRequired,
  coordinates: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default Bike
