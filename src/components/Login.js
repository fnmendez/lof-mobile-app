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
import { LoginSchema } from '../helpers/validation'
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
              placeholderTextColor={colors.PBK}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              onSubmitEditing={handleSubmit}
              name="mail"
              keyboardType="email-address"
              error={touched.mail && errors.mail}
            />
            <Input
              label="Contraseña"
              autoCapitalize="none"
              value={values.password}
              autoCorrect={false}
              returnKeyType="go"
              placeholderTextColor={colors.PBK}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              onSubmitEditing={handleSubmit}
              name="password"
              error={touched.password && errors.password}
              secureTextEntry={true}
            />
            {!!this.props.error && (
              <Text style={styles.error}>{this.props.error}</Text>
            )}
            {this.props.loading && (
              <ActivityIndicator size="large" color={colors.YO} />
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
    width: 250,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: colors.B,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.W,
    fontWeight: '700',
  },
  error: {
    marginTop: 1,
    marginBottom: 12,
    fontSize: 14,
    color: colors.R,
  },
})

export default connect(
  mapStateToProps,
  null
)(Login)
