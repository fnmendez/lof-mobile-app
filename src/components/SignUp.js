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

import { RegisterSchema } from '../helpers/validation'
import Input from './Input'
import colors from '../styles'

const mapStateToProps = state => ({
  error: state.user.error,
  loading: state.user.loading,
})

class SignUp extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          mail: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={this.props.handleSubmit}
        validationSchema={RegisterSchema}
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
              label="Nombre"
              autoCapitalize="words"
              value={values.firstName}
              autoCorrect={false}
              returnKeyType="go"
              placeholderTextColor={colors.PBK}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              onSubmitEditing={handleSubmit}
              name="firstName"
              error={touched.firstName && errors.firstName}
            />
            <Input
              label="Apellido"
              autoCapitalize="words"
              value={values.lastName}
              autoCorrect={false}
              returnKeyType="go"
              placeholderTextColor={colors.PBK}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              onSubmitEditing={handleSubmit}
              name="lastName"
              error={touched.lastName && errors.lastName}
            />
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
            <Input
              label="Confirmar contraseña"
              autoCapitalize="none"
              value={values.confirmPassword}
              autoCorrect={false}
              returnKeyType="go"
              placeholderTextColor={colors.PBK}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              onSubmitEditing={handleSubmit}
              name="confirmPassword"
              error={touched.confirmPassword && errors.confirmPassword}
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

SignUp.propTypes = {
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 250,
    marginTop: 20,
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
    marginTop: 3,
    marginBottom: 12,
    fontSize: 14,
    color: colors.R,
  },
})

export default connect(
  mapStateToProps,
  null
)(SignUp)
