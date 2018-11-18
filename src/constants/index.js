import {
  API_URI,
  BLE_CHARACTERISTIC_UUID,
  BLE_GET_INFO_PAYLOAD,
  BLE_REQUEST_OPEN_PAYLOAD,
  BLE_REQUEST_LOCK_PAYLOAD,
  BLE_SERVICE_UUID,
  MAPBOX_TOKEN,
} from 'react-native-dotenv'

import stringToHex from '../helpers/stringToHex'

module.exports = {
  // API
  API_URI: API_URI || 'http://localhost:3000',
  // Bluetooth
  scanTimeOut: 10,
  retrySendTimes: 12,
  serviceUUID: BLE_SERVICE_UUID,
  characteristicUUID: BLE_CHARACTERISTIC_UUID,
  getInfoPayload: stringToHex(BLE_GET_INFO_PAYLOAD),
  requestOpenPayload: stringToHex(BLE_REQUEST_OPEN_PAYLOAD),
  requestLockPayload: stringToHex(BLE_REQUEST_LOCK_PAYLOAD),
  // Mapbox
  MAPBOX_TOKEN,
  secondsToUpdateBikesLocation: 10,
  mapboxConfig: {
    centerCoordinate: [-73.051, -36.825],
    logoEnabled: false,
    zoomLevel: 12,
    minZoomLevel: 13,
    maxZoomLevel: 17,
    zoomEnabled: true,
    scrollEnabled: true,
    rotateEnabled: true,
    pitchEnabled: false,
    compassEnabled: false,
  },
}
