import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { checkConfirmation } from '../actions/user'
import colors from '../styles'

const mapStateToProps = state => ({
  mail: state.user.mail,
  token: state.user.token,
})

const mapDispatchToProps = {
  checkConfirmation,
}

class ConfirmAccount extends Component {
  handlePress = () => {
    this.props.checkConfirmation({ token: this.props.token })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.window}>
          <Text style={styles.text}>
            {`Se ha enviado un correo a ${
              this.props.mail
            } para que confirmes tu cuenta`}
          </Text>
        </View>
        {this.props.loading && (
          <ActivityIndicator size="large" color={colors.YO} />
        )}
        {!this.props.loading && (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handlePress}
          >
            <Text style={styles.buttonText}>Listo</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BK,
  },
  window: {
    backgroundColor: colors.G,
    borderRadius: 15,
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
    fontWeight: '500',
    color: colors.W,
  },
  buttonContainer: {
    marginTop: 15,
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

ConfirmAccount.propTypes = {
  mail: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  checkConfirmation: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmAccount)
