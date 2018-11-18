import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import isAndroid from '../helpers/platform'
import colors, { buttonStyle } from '../styles'

const renderButtons = (button, index) => (
  <TouchableOpacity
    key={index}
    style={{
      ...styles.modalButtonContainer,
      ...button.buttonStyle,
    }}
    onPress={button.onPress}
  >
    <Text style={{ ...styles.modalButtonText, ...button.textStyle }}>
      {button.text}
    </Text>
  </TouchableOpacity>
)

const ConfirmationModal = props => (
  <Modal
    visible={props.visible}
    animationType="fade"
    transparent={true}
    onRequestClose={props.onOutsideClick}
  >
    <TouchableWithoutFeedback onPress={props.onOutsideClick}>
      <View style={styles.modalContentContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{props.message}</Text>
          <>{props.buttons.map(renderButtons)}</>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
)

ConfirmationModal.propTypes = {
  buttons: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  modalContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: 170,
    width: 270,
    marginTop: 60,
    padding: 40,
    borderRadius: 15,
    borderColor: colors.BG,
    borderWidth: 1,
    backgroundColor: colors.Punch,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalText: {
    fontSize: isAndroid ? 18 : 22,
    color: colors.White,
    textAlign: 'center',
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
  },
  modalButtonContainer: {
    ...buttonStyle,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: isAndroid ? 180 : 200,
  },
})

export default ConfirmationModal
