import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { login } from '../actions/user'
import colors from '../styles'

const mapDispatchToProps = {
  login: login,
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }

  onChange = value => {
    this.setState({
      username: value.trim(),
    })
  }

  validateUsername = () => {
    if (!this.state.username.length) {
      Alert.alert('Debes ingresar un nombre de usuario')
    } else {
      this.props.login({ username: this.state.username })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor={colors.PBK}
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={18}
          onChangeText={username =>
            this.setState({ username: username.trim() })
          }
          onSubmitEditing={this.validateUsername}
          selectionColor={colors.P}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.validateUsername}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
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
  null,
  mapDispatchToProps
)(Login)
