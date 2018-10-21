import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik'

import { signup } from '../actions/user'
import { Input } from '../components'
import colors from '../styles'
import UserSchema from '../helpers/validation'

const mapDispatchToProps = {
  signup,
}

class SignUp extends Component {
  handleSubmit = values => {
    this.props.signup(values)
  }

  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            mail: '',
            firstName: '',
            lastName: '',
            address: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={this.handleSubmit}
          validationSchema={UserSchema}
          render={({
            values,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <>
              <Input
                label="Nombre*"
                autoCapitalize="none"
                value={values.firstName}
                autoCorrect={false}
                returnKeyType="go"
                placeholderTextColor={colors.PBK}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="firstName"
                error={touched.firstName && errors.firstName}
              />
              <Input
                label="Apellido*"
                autoCapitalize="none"
                value={values.lastName}
                autoCorrect={false}
                returnKeyType="go"
                placeholderTextColor={colors.PBK}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="lastName"
                error={touched.lastName && errors.lastName}
              />
              <Input
                label="Correo electrónico*"
                autoCapitalize="none"
                value={values.mail}
                autoCorrect={false}
                returnKeyType="go"
                placeholderTextColor={colors.PBK}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="mail"
                keyboardType="email-address"
                error={touched.mail && errors.mail}
              />
              <Input
                label="Dirección"
                autoCapitalize="none"
                value={values.address}
                autoCorrect={false}
                returnKeyType="go"
                placeholderTextColor={colors.PBK}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="address"
                error={touched.address && errors.address}
              />
              <Input
                label="Contraseña*"
                autoCapitalize="none"
                value={values.password}
                autoCorrect={false}
                returnKeyType="go"
                placeholderTextColor={colors.PBK}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="password"
                error={touched.password && errors.password}
                secureTextEntry={true}
              />
              <Input
                label="Confirmar contraseña*"
                autoCapitalize="none"
                value={values.confirmPassword}
                autoCorrect={false}
                returnKeyType="go"
                placeholderTextColor={colors.PBK}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="confirmPassword"
                error={touched.confirmPassword && errors.confirmPassword}
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
    )
  }
}

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BK,
  },
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
})

export default connect(
  null,
  mapDispatchToProps
)(SignUp)
