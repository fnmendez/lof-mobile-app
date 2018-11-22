import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Formik } from 'formik'

import Input from './Input'
import isAndroid from '../helpers/platform'
import { LoginSchema } from '../constants/validation'
import colors from '../styles'

const mapStateToProps = state => ({
  error: state.user.error,
  loading: state.user.loading,
})

class Login extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          mail: '',
          password: '',
        }}
        onSubmit={this.props.handleSubmit}
        validationSchema={LoginSchema}
        render={({
          errors,
          handleSubmit,
          setFieldTouched,
          setFieldValue,
          touched,
          values,
        }) => (
          <>
            <Input
              label="Correo electrónico"
              autoCapitalize="none"
              value={values.mail}
              autoCorrect={false}
              returnKeyType="go"
              placeholderTextColor={colors.BG}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              onSubmitEditing={handleSubmit}
              name="mail"
              keyboardType="email-address"
            />
            <Input
              label="Contraseña"
              autoCapitalize="none"
              value={values.password}
              autoCorrect={false}
              returnKeyType="go"
              placeholderTextColor={colors.BG}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              onSubmitEditing={handleSubmit}
              name="password"
              secureTextEntry={true}
            />
            {!!touched.mail && errors.mail && (
              <Text style={styles.error}>{errors.mail}</Text>
            )}
            {!!touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            {!!this.props.error && (
              <Text style={styles.error}>{this.props.error}</Text>
            )}
            {this.props.loading && (
              <ActivityIndicator size="large" color={colors.SeaBuckthorn} />
            )}
            {!this.props.loading && (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      />
    )
  }
}

Login.propTypes = {
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: isAndroid ? 270 : 250,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: colors.Mirage,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.White,
    fontWeight: '700',
  },
  error: {
    marginTop: 1,
    marginBottom: 6,
    fontSize: 14,
    color: colors.Punch,
  },
})

export default connect(
  mapStateToProps,
  null
)(Login)
