import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  AppState,
  NativeModules,
  NativeEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    await this.bluetooth.retrieveServices(macAddress, Array.of(serviceUUID))
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
    this.bluetooth.scan(Array.of(serviceUUID), scanTimeOut)
    this.setState({ scanning: true })
  }

  send = async (macAddress, serviceUUID, characteristic, payload, tries) => {
    try {
      await this.bluetooth.write(
        macAddress,
        serviceUUID,
        characteristic,
        payload,
        30
      )
    } catch (error) {
      tries--
      if (tries > 0) {
        return this.send(
          macAddress,
          serviceUUID,
          characteristic,
          payload,
          tries
        )
      }
      return Promise.reject(error)
    }
  }

  receive = async (macAddress, serviceUUID, characteristic, tries) => {
    try {
      const answer = await this.bluetooth.read(
        macAddress,
        serviceUUID,
        characteristic
      )
      return answer
    } catch (error) {
      tries--
      if (tries > 0) {
        return this.receive(macAddress, serviceUUID, characteristic, tries)
      }
      return Promise.reject(error)
    }
  }

  render() {
    const { rubi_id } = this.props
    return (
      <View style={styles.container}>
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
    )
  }
}

BluetoothWindow.propTypes = {
  rubi_id: PropTypes.number.isRequired,
  macAddress: PropTypes.string.isRequired,
  firstHandshake: PropTypes.array.isRequired,
  secondHandshake: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
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
