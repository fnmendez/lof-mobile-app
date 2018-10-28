import { MAPBOX_TOKEN } from 'react-native-dotenv'

module.exports = {
  API_URI: process.env.API_URI || 'http://192.168.0.21:3000',
  MAPBOX_TOKEN,
  mapboxConfig: {
    /* Concepcion coordinates */
    centerCoordinate: [-73.04, -36.82],
    logoEnabled: false,
    zoomLevel: 13,
    minZoomLevel: 2,
    maxZoomLevel: 16,
    zoomEnabled: true,
    scrollEnabled: true,
    rotateEnabled: true,
    pitchEnabled: false,
  },
}
