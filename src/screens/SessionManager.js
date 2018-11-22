import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

import { getUser } from '../actions/user'
import { saveTrip } from '../actions/bikes'
import colors from '../styles'

const mapStateToProps = state => ({
  mail: state.user.mail,
  token: state.user.token,
})

const mapDispatchToProps = {
  getUser,
  saveTrip,
}

class SessionManager extends Component {
  async componentDidMount() {
    /**
     * As rehydration was made (otherwise this component is not rendered)
     * we get the last user token from redux state
     */
    if (!this.props.token) {
      // If there is no token saved, go to authentication screens
      return this.navigate('Main')
    }

    try {
      // Get user info with our token
      const getUserPayload = await this.props.getUser({
        token: this.props.token,
      })
      const userInfo = getUserPayload.value

      // Check token validity
      if (userInfo.token === this.props.token) {
        /**
         * If user has current trip, go to current trip screens
         * Otherwise go to Tabs screen starting with the map
         */
        if (userInfo.trip) {
          await this.props.saveTrip(userInfo)
          return this.navigate('TripWindow')
        } else {
          return this.navigate('Tabs')
        }
      }
    } catch (err) {
      // If there is an error, navigate to authentication screens
      console.log(err) // eslint-disable-line no-console
      return this.navigate('Main')
    }
  }

  navigate = routeName => {
    this.props.navigation.navigate(routeName)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Image
          source={require('../styles/logo/logo-white.png')}
          style={styles.logo}
        />
        <ActivityIndicator size="large" color={colors.SeaBuckthorn} />
      </View>
    )
  }
}

SessionManager.propTypes = {
  getUser: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  saveTrip: PropTypes.func.isRequired,
  token: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.White,
  },
  logo: {
    height: 300,
    width: 300,
    marginTop: 100,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionManager)
