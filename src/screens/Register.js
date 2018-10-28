import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Formik } from 'formik'

import { signup } from '../actions/user'
import { Input } from '../components'
import colors from '../styles'
import UserSchema from '../helpers/validation'

const mapStateToProps = state => ({
  loading: state.user.loading,
})

const mapDispatchToProps = {
  signup,
}

class SignUp extends Component {
  handleSubmit = async (values, bag) => {
    try {
      await this.props.signup(values)
    } catch (err) {
      bag.setSubmitting(false)
      bag.setErrors(err)
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.topContainer} behavior="padding">
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          centerContent={true}
        >
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              mail: '',
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
                  label="Primer apellido"
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
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.BK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
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
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
