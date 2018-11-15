import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { Login } from '../components'
import { login } from '../actions/user'
import colors from '../styles'

const mapDispatchToProps = {
  login,
}

class MainScreen extends Component {
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content')
    })
  }

  componentWillUnmount() {
    this.navListener.remove()
  }

  handleSubmit = async (values, bag) => {
    try {
      await this.props.login(values)
    } catch (err) {
      bag.setSubmitting(false)
      bag.setErrors(err)
    }
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAvoidingView
        style={styles.container}
        {...(Platform.OS === 'ios' ? { behavior: 'padding' } : null)}
      >
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>LOF</Text>
        <Login handleSubmit={this.handleSubmit} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>¿No tienes cuenta? Crea una </Text>
          <TouchableWithoutFeedback onPress={() => navigate('Register')}>
            <View style={styles.linkContainer}>
              <Text style={styles.link}>aquí</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

MainScreen.propTypes = {
  login: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BK,
  },
  title: {
    fontSize: 50,
    color: colors.W,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 25,
  },
  text: {
    color: colors.W,
  },
  linkContainer: {
    height: 35,
    paddingRight: 25,
    justifyContent: 'center',
  },
  link: {
    color: colors.B,
  },
})

export default connect(
  null,
  mapDispatchToProps
)(MainScreen)
