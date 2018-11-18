import React from 'react'
import PropTypes from 'prop-types'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../styles'

const Bike = props => {
  const { rubi_id, selected, coordinates, onPress } = props
  return (
    <Mapbox.PointAnnotation id={String(rubi_id)} coordinate={coordinates}>
      <Icon
        name="directions-bike"
        color={selected ? colors.Punch : colors.Mirage}
        size={30}
        onPress={onPress}
      />
    </Mapbox.PointAnnotation>
  )
}

Bike.propTypes = {
  coordinates: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  rubi_id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default Bike
