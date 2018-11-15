import React, { PureComponent } from 'react'
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getTrips } from '../actions/bikes'
import parseDate from '../helpers/parseDate'
import colors from '../styles'

const mapStateToProps = state => ({
  loading: state.bikes.loading,
  token: state.user.token,
  trips: state.bikes.trips,
})

const mapDispatchToProps = {
  getTrips,
}

const Trip = ({ startedAt, finishedAt, cost }) => (
  <View style={styles.tripContainer}>
    <Text style={styles.tripText}>{parseDate(startedAt)}</Text>
    <Text style={styles.tripText}>{parseDate(finishedAt)}</Text>
    <Text style={styles.tripText}>{cost}</Text>
  </View>
)

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Inicio</Text>
    <Text style={styles.headerText}>Fin</Text>
    <Text style={styles.headerText}>Costo</Text>
  </View>
)

const Separator = () => <View style={styles.separator} />

class History extends PureComponent {
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content')
    })
    this.props.getTrips({ token: this.props.token })
  }

  componentWillUnmount() {
    this.navListener.remove()
  }

  renderTrip = ({ item, index }) => (
    <Trip
      key={index}
      startedAt={item.startedAt}
      finishedAt={item.finishedAt}
      cost={item.cost}
    />
  )
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tus viajes</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={this.props.trips}
            renderItem={this.renderTrip}
            ListHeaderComponent={Header}
            ItemSeparatorComponent={Separator}
            refreshControl={
              <RefreshControl
                onRefresh={() =>
                  this.props.getTrips({ token: this.props.token })
                }
                refreshing={this.props.loading}
                tintColor={colors.YO}
              />
            }
          />
        </View>
      </View>
    )
  }
}

Trip.propTypes = {
  cost: PropTypes.number.isRequired,
  finishedAt: PropTypes.string.isRequired,
  startedAt: PropTypes.string.isRequired,
}

History.propTypes = {
  getTrips: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  trips: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BK,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.W,
    marginTop: 40,
    marginBottom: 20,
  },
  listContainer: {
    height: 400,
    width: 280,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: colors.DG,
  },
  headerContainer: {
    height: 20,
    backgroundColor: colors.BG,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.BK,
  },
  tripContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.G,
  },
  tripText: {
    color: colors.W,
    fontSize: 12,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.DG,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)
