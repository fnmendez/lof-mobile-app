import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { checkConfirmation, logout } from '../actions/user'
import isAndroid from '../helpers/platform'
import colors, { logoSmall, buttonStyle } from '../styles'

const mapStateToProps = state => ({
  mail: state.user.mail,
  token: state.user.token,
  loading: state.user.loading,
})

const mapDispatchToProps = {
  checkConfirmation,
  logout,
}

class ConfirmAccount extends Component {
  handleSubmit = () => {
    this.props.checkConfirmation({ token: this.props.token })
  }

  handleReturn = () => {
    this.props.logout()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../styles/logo/logos-02.png')}
          style={logoSmall}
        />
        <View style={styles.window}>
          <Text style={styles.text}>
            {`Se ha enviado un correo a ${
              this.props.mail
            } para que confirmes tu cuenta`}
          </Text>
        </View>
        {this.props.loading && (
          <ActivityIndicator size="large" color={colors.SeaBuckthorn} />
        )}
        {!this.props.loading && (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Listo</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={this.handleReturn}
        >
          <Text style={styles.buttonText}>Desconectarse</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

ConfirmAccount.propTypes = {
  checkConfirmation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  mail: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PuertoRico,
    paddingBottom: 30,
  },
  window: {
    width: isAndroid ? 290 : 270,
    backgroundColor: colors.White,
    borderRadius: 15,
    margin: 12,
    marginTop: 32,
    padding: 8,
  },
  text: {
    fontSize: isAndroid ? 14 : 16,
    textAlign: 'center',
    margin: 10,
    fontWeight: isAndroid ? '200' : '500',
    color: colors.Mirage,
  },
  buttonContainer: {
    ...buttonStyle,
    backgroundColor: colors.Mirage,
  },
  backButtonContainer: {
    marginTop: 15,
    width: isAndroid ? 270 : 250,
    borderRadius: 8,
    backgroundColor: colors.BG,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.White,
    fontWeight: '700',
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmAccount)
