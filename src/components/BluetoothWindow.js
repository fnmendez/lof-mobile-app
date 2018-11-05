import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  AppState,
  Modal,
  NativeModules,
  NativeEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import BleManager from 'react-native-ble-manager'

import {
  characteristicUUID,
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
      appState: AppState.currentState,
      scanning: false,
    }
    // Reference BleManager
    this.bluetooth = BleManager
  }

  componentDidMount() {
    // Start bluetooth manager
    this.bluetooth.start()
    // Set event listeners
    this.listenAppStateChange = AppState.addListener(
      'appStateDidChange',
      this.handleAppStateDidChange
    )
    this.listenDiscoverPeripheralEvent = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral
    )
    this.listenStopScanEvent = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan
    )
    this.listenDisconnectPeripheralEvent = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectPeripheral
    )
    this.listenDidUpdateValueForCharacteristicEvent = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleDidUpdateValueForCharacteristic
    )
  }

  componentWillUnmount() {
    // Stop event listeners
    this.listenAppStateDidChange.remove()
    this.listenDiscoverPeripheralEvent.remove()
    this.listenStopScanEvent.remove()
    this.listenDisconnectPeripheralEvent.remove()
    this.listenDidUpdateValueForCharacteristicEvent.remove()
  }

  // Event handlers

  handleAppStateDidChange = nextAppState => {
    this.setState({ appState: nextAppState.app_state })
  }

  handleDiscoverPeripheral = peripheral => {
    /**
     *  Once we have found our SmartLock we stop scanning and we connect to it.
     *  Note: There is a bug in BleManager, it does not emit StopScan event
     *  in this case.
     */
    if (peripheral.id === this.props.macAddress) {
      this.bluetooth.stopScan()
      this.setState({ scanning: false })
      this.requestOpen()
    }
  }

  handleStopScan = () => {
    this.setState({ scanning: false })
  }

  handleDisconnectPeripheral = () => {
    if (this.state.peripheral) {
      this.setState(prevState => ({
        peripheral: { ...prevState.peripheral, connected: false },
      }))
    }
  }

  handleDidUpdateValueForCharacteristic = data => {
    // eslint-disable-next-line no-console
    console.log(
      `Received data from ${data.peripheral}
      characteristic ${data.characteristic}`,
      data.value
    )
  }

  // Bluetooth Actions

  requestOpen = async () => {
    const { macAddress, firstHandshake, secondHandshake } = this.props
    await this.bluetooth.connect(macAddress)
    await this.bluetooth.retrieveServices(macAddress, [serviceUUID])
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
    await retry(
      this.bluetooth.write,
      [macAddress, serviceUUID, characteristicUUID, requestOpenPayload],
      tries
    )
  }

  // Chore functions

  onButtonPress = () => {
    /**
     * Start scanning bluetooth devices filtering by our service.
     * It is likely to be needed to discover a device first so
     * one is able to read/write to its bluetooth characteristic.
     */
    this.bluetooth.scan([serviceUUID], scanTimeOut)
    this.setState({ scanning: true })
  }

  render() {
    const { onOutsideClick, rubi_id, visible } = this.props
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
              <Text style={styles.text}>¿Solicitar bicicleta #{rubi_id}?</Text>
              {this.state.scanning && (
                <ActivityIndicator size="large" color={colors.YO} />
              )}
              {!this.state.scanning && (
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.onButtonPress}
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
  onOutsideClick: PropTypes.func.isRequired,
  rubi_id: PropTypes.number.isRequired,
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
