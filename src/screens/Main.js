import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { Login } from '../components'
import { login } from '../actions/user'
import isAndroid from '../helpers/platform'
import colors, { mainContainerStyle, logoMedium } from '../styles'

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
        {...(isAndroid ? null : { behavior: 'padding' })}
      >
        <StatusBar barStyle="light-content" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          centerContent={true}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../styles/logo/logos-03.png')}
            style={logoMedium}
          />
          <Login handleSubmit={this.handleSubmit} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>¿No tienes cuenta? Crea una </Text>
            <TouchableWithoutFeedback onPress={() => navigate('Register')}>
              <View style={styles.linkContainer}>
                <Text style={styles.link}>aquí</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
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
    ...mainContainerStyle,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: isAndroid ? 100 : 0,
    paddingBottom: isAndroid ? 30 : 0,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 25,
  },
  text: {
    color: colors.Mirage,
  },
  linkContainer: {
    height: 35,
    paddingRight: 25,
    justifyContent: 'center',
  },
  link: {
    color: colors.Mirage,
    fontWeight: '900',
  },
})

export default connect(
  null,
  mapDispatchToProps
)(MainScreen)
