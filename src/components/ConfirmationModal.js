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

import colors from '../styles'

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
    height: 150,
    width: 250,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    borderColor: colors.BG,
    borderWidth: 1,
    backgroundColor: colors.DG,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalText: {
    fontSize: 25,
    color: colors.PW,
    textAlign: 'center',
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
  },
  modalButtonContainer: {
    width: 180,
    height: 50,
    marginTop: 15,
    borderRadius: 8,
    justifyContent: 'center',
    paddingVertical: 10,
  },
})

export default ConfirmationModal
