import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native'

import { SignUp } from '../components'
import { signup } from '../actions/user'
import isAndroid from '../helpers/platform'
import { mainContainerStyle, logoMedium } from '../styles'

const mapStateToProps = state => ({
  loading: state.user.loading,
})

const mapDispatchToProps = {
  signup,
}

class Register extends Component {
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
      <KeyboardAvoidingView
        style={styles.topContainer}
        {...(!isAndroid ? { behavior: 'padding' } : null)}
      >
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
          <SignUp handleSubmit={this.handleSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

Register.propTypes = {
  signup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  topContainer: {
    ...mainContainerStyle,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
