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
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { bleManager } from '../App'
import {
  characteristicUUID,
  getInfoPayload,
  requestOpenPayload,
  scanTimeOut,
  serviceUUID,
  tries,
} from '../constants'
import retry from '../helpers/retryFunction'
import colors from '../styles'

const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

class BluetoothWindow extends Component {
  constructor(props) {
    super(props)
    // Initial state
    this.state = {
      processing: false,
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
    this.props.onActionError()
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
      this.bluetooth.stopScan()
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
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={onOutsideClick}
      >
        <TouchableWithoutFeedback onPress={onOutsideClick}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.text}>
                {requestOpenMode
                  ? `¿Solicitar bicicleta #${rubi_id}?`
                  : '¿Seguro que deseas terminar tu viaje?'}
              </Text>
              {this.state.processing && (
                <ActivityIndicator size="large" color={colors.YO} />
              )}
              {!this.state.processing && (
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.onButtonPressed}
                >
                  <Text style={styles.buttonText}>Solicitar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

BluetoothWindow.propTypes = {
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
    width: 300,
    padding: 20,
    borderRadius: 15,
    borderColor: colors.PBK,
    borderWidth: 0.5,
    backgroundColor: colors.PW,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 1000,
  },
  text: {
    fontSize: 20,
    color: colors.BK,
  },
  buttonContainer: {
    width: 250,
    borderRadius: 8,
    backgroundColor: colors.B,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.W,
    fontWeight: '700',
  },
})

export default BluetoothWindow
