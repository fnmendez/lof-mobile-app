import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  Modal,
  NativeModules,
  NativeEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MI from 'react-native-vector-icons/MaterialIcons'

import { bleManager } from '../App'
import { UnlockTutorial } from '../components'
import {
  characteristicUUID,
  getInfoPayload,
  requestOpenPayload,
  scanTimeOut,
  serviceUUID,
  tries,
} from '../constants'
import isAndroid from '../helpers/platform'
import retry from '../helpers/retryFunction'
import colors, { buttonStyle } from '../styles'

const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

class BluetoothWindow extends Component {
  constructor(props) {
    super(props)
    // Initial state
    this.state = {
      processing: false,
      error: '',
    }
    // Reference BleManager Singleton
    this.bluetooth = bleManager
  }

  setListeners = () => {
    // Set event listeners
    this.listenDiscoverPeripheralEvent = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral
    )
    this.listenStopScanEvent = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan
    )
  }

  removeListeners = () => {
    // Stop event listeners
    this.listenDiscoverPeripheralEvent.remove()
    this.listenStopScanEvent.remove()
  }

  // Event handlers

  handleDiscoverPeripheral = peripheral => {
    /**
     *  Once we have found our SmartLock we stop scanning and we connect to it.
     *  Note: There is a bug in BleManager, it does not emit StopScan event
     *  in this case. But we take advantage of it because we know if we had
     *  success on scanning (and we manually stopped scanning) then the process
     *  is still going so we keep `this.state.processing === true`.
     */
    const { requestOpenMode } = this.props
    if (peripheral.id === this.props.macAddress) {
      this.bluetooth.stopScan()
      if (requestOpenMode) {
        this.requestOpen()
      } else {
        this.requestLock()
      }
    }
  }

  handleStopScan = () => {
    this.setState({ processing: false })
    this.onActionError()
  }

  // Bluetooth Actions

  handshakes = async () => {
    /**
     * Does the handshake with the lock so one can
     * execute commands
     */
    const { macAddress, firstHandshake, secondHandshake } = this.props
    await retry(
      this.bluetooth.write,
      [macAddress, serviceUUID, characteristicUUID, firstHandshake],
      tries
    )
    await retry(
      this.bluetooth.write,
      [macAddress, serviceUUID, characteristicUUID, secondHandshake],
      tries
    )
  }

  requestOpen = async () => {
    // Unlocks the bike
    const { macAddress } = this.props
    await this.bluetooth.connect(macAddress)
    await this.bluetooth.retrieveServices(macAddress, [serviceUUID])
    await this.handshakes()
    await retry(
      this.bluetooth.write,
      [macAddress, serviceUUID, characteristicUUID, requestOpenPayload],
      tries
    )
    this.onActionFinished()
  }

  requestLock = async () => {
    /**
     * If the bike is locked, then finish the trip
     * Otherwise send error
     */
    const { macAddress } = this.props
    await this.bluetooth.connect(macAddress)
    await this.bluetooth.retrieveServices(macAddress, [serviceUUID])
    await this.handshakes()
    await retry(
      this.bluetooth.write,
      [macAddress, serviceUUID, characteristicUUID, getInfoPayload],
      tries
    )
    const readValue = await retry(
      this.bluetooth.read,
      [macAddress, serviceUUID, characteristicUUID],
      tries
    )
    if (readValue[4] === 1) {
      // If the bike is locked
      this.onActionFinished()
    } else {
      // If the bike is NOT locked
      this.onActionError()
    }
  }

  onActionError = () => {
    /**
     * This usually means that the user has not locked the bike
     * and he is trying to finish the trip.
     */
    if (this.props.onActionError) {
      this.props.onActionError()
    } else {
      this.setState({
        error:
          'No se ha podido conectar. Asegúrate de tener encendido tu Bluetooth e intenta de nuevo.',
      })
    }
  }

  onActionFinished = () => {
    /**
     * If the call is from BikesMap component, then
     * the trip is going to be started
     * If the call is from TripWindow component, then
     * the trip is going to be finished
     */
    this.removeListeners()
    this.setState({ processing: false })
    this.props.onActionFinished()
  }

  onButtonPressed = async () => {
    /**
     * Start scanning bluetooth devices filtering by our service.
     * It is likely to be needed to discover a device first so
     * one is able to read/write to its bluetooth characteristic.
     */
    const { requestOpenMode } = this.props
    this.setListeners()
    const cp = await this.bluetooth.getConnectedPeripherals([serviceUUID])
    if (cp.length) {
      if (requestOpenMode) {
        return this.requestOpen()
      } else {
        return this.requestLock()
      }
    }
    this.bluetooth.scan([serviceUUID], scanTimeOut)
    this.setState({ processing: true })
  }

  render() {
    const { onOutsideClick, requestOpenMode, rubi_id, visible } = this.props
    let contentStyle = styles.modalContent
    if (requestOpenMode) {
      contentStyle = { ...contentStyle, ...styles.extraHeightOnRequestOpenMode }
    } else {
      contentStyle = { ...contentStyle, ...styles.tripModeStyle }
    }
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={onOutsideClick}
      >
        <View style={styles.modalContentContainer}>
          <View style={contentStyle}>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={onOutsideClick}>
                <MI name="close" color={colors.G} size={16} />
              </TouchableOpacity>
            </View>
            {requestOpenMode && <UnlockTutorial />}
            <Text style={styles.text}>
              {requestOpenMode
                ? `¿Solicitar bicicleta nº${rubi_id}?`
                : '¿Seguro que deseas terminar tu viaje?'}
            </Text>
            {this.state.processing && (
              <ActivityIndicator size="large" color={colors.SeaBuckthorn} />
            )}
            {!!this.state.error && (
              <Text style={styles.error}>{this.state.error}</Text>
            )}
            {!this.state.processing && (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={
                  this.props.blocked
                    ? () =>
                        this.setState({
                          error: 'Primero debes cargar saldo',
                        })
                    : this.onButtonPressed
                }
              >
                <Text style={styles.buttonText}>Solicitar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    )
  }
}

BluetoothWindow.propTypes = {
  blocked: PropTypes.bool,
  error: PropTypes.string,
  firstHandshake: PropTypes.array.isRequired,
  macAddress: PropTypes.string.isRequired,
  onActionError: PropTypes.func,
  onActionFinished: PropTypes.func.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  requestOpenMode: PropTypes.bool.isRequired,
  rubi_id: PropTypes.number,
  secondHandshake: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  modalContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: 150,
    width: isAndroid ? 300 : 280,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.PuertoRico,
  },
  tripModeStyle: {
    backgroundColor: colors.Punch,
  },
  extraHeightOnRequestOpenMode: {
    height: 450,
  },
  text: {
    fontSize: isAndroid ? 18 : 21,
    fontWeight: isAndroid ? '500' : '600',
    alignItems: 'center',
    color: colors.White,
  },
  error: {
    fontSize: isAndroid ? 14 : 18,
    marginTop: 8,
    textAlign: 'center',
    color: colors.Punch,
  },
  buttonContainer: {
    ...buttonStyle,
    width: isAndroid ? 240 : 210,
    backgroundColor: colors.Mirage,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.White,
    fontWeight: '700',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: -15,
    marginRight: -14,
    padding: 5,
  },
})

export default BluetoothWindow
