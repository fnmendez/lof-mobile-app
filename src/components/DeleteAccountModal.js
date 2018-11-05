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

const DeleteAccountModal = props => (
  <Modal
    visible={props.visible}
    animationType="fade"
    transparent={true}
    onRequestClose={props.onOutsideClick}
  >
    <TouchableWithoutFeedback onPress={props.onOutsideClick}>
      <View style={styles.modalContentContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            ¿Seguro que deseas eliminar tu cuenta?
          </Text>
          <TouchableOpacity
            style={styles.modalDeleteButtonContainer}
            onPress={props.onPress}
          >
            <Text style={styles.modalDeleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
)

DeleteAccountModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
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
  modalDeleteButtonText: {
    textAlign: 'center',
    color: colors.R,
    fontSize: 30,
    fontWeight: '700',
  },
  modalDeleteButtonContainer: {
    width: 180,
    height: 50,
    marginTop: 15,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: colors.BK,
    paddingVertical: 10,
  },
})

export default DeleteAccountModal
