import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { login } from '../actions/user'
import colors from '../styles'

const mapStateToProps = state => ({
  loading: state.user.loading,
})

const mapDispatchToProps = {
  login: login,
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '',
      password: '',
    }
  }

  setEmail = mail => this.setState({ mail })

  setPassword = password => this.setState({ password })

  handleSubmit = () => {
    const { mail, password } = this.state
    if (!this.validInput({ mail, password })) return
    this.props.login({ mail, password })
  }

  validInput = ({ mail, password }) => {
    if (!mail.length || !password.length) {
      Alert.alert('Debes ingresar un nombre de usuario')
      return false
    }
    return true
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor={colors.PBK}
          textContentType="username"
          keyboardType="email-address"
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={24}
          onChangeText={this.setEmail}
          onSubmitEditing={this.handleSubmit}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={colors.PBK}
          textContentType="password"
          secureTextEntry={true}
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={12}
          onChangeText={this.setPassword}
          onSubmitEditing={this.handleSubmit}
        />
        {this.props.loading && (
          <ActivityIndicator size="large" color={colors.YO} />
        )}
        {!this.props.loading && (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: colors.BG,
    borderRadius: 4,
    marginBottom: 20,
    color: colors.BK,
    fontWeight: '500',
    paddingHorizontal: 10,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
