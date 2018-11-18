import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { ConfirmationModal, ProfileHeader, UserInfo } from '../components'
import { destroy, getUser, logout } from '../actions/user'
import colors, { buttonStyle } from '../styles'

const mapStateToProps = state => ({
  balance: state.user.balance,
  mail: state.user.mail,
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  loading: state.user.loading,
  token: state.user.token,
})

const mapDispatchToProps = {
  getUser,
  logout,
  destroy,
}

class Profile extends Component {
  // Initial state
  state = {
    showDeleteModal: false,
  }

  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content')
    })
    this.props.getUser({ token: this.props.token })
  }

  componentWillUnmount() {
    this.navListener.remove()
  }

  handleRefresh = () => {
    this.props.getUser({ token: this.props.token })
  }

  handleLogout = () => {
    this.props.logout()
  }

  handleDeletePressed = () => {
    this.setState({ showDeleteModal: true })
  }

  handleOutsideModalPressed = () => {
    this.setState({ showDeleteModal: false })
  }

  handleDestroy = () => {
    this.setState({ showDeleteModal: false })
    this.props.destroy({ token: this.props.token })
  }

  render() {
    const { balance, mail, firstName, lastName } = this.props
    return (
      <View style={styles.container}>
        <ScrollView
          centerContent={true}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.handleRefresh}
              tintColor={colors.SeaBuckthorn}
            />
          }
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <ConfirmationModal
            visible={this.state.showDeleteModal}
            onOutsideClick={this.handleOutsideModalPressed}
            message={'¿Seguro que deseas eliminar tu cuenta?'}
            buttons={[
              {
                text: 'Eliminar',
                buttonStyle: { backgroundColor: colors.Mirage },
                textStyle: { color: colors.White },
                onPress: this.handleDestroy,
              },
            ]}
          />
          <ProfileHeader mail={mail} />
          <UserInfo
            firstName={firstName}
            lastName={lastName}
            balance={balance}
          />
          <TouchableOpacity
            style={styles.logoutButtonContainer}
            onPress={this.handleLogout}
          >
            <Text style={styles.buttonText}>Desconectarse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButtonContainer}
            onPress={this.handleDeletePressed}
          >
            <Text style={styles.buttonText}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

Profile.propTypes = {
  balance: PropTypes.number.isRequired,
  destroy: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  mail: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.PuertoRico,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoutButtonContainer: {
    ...buttonStyle,
    backgroundColor: colors.Mirage,
  },
  deleteButtonContainer: {
    ...buttonStyle,
    backgroundColor: colors.Punch,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.White,
    fontSize: 20,
    fontWeight: '900',
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
