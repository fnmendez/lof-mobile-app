import React, { PureComponent } from 'react'
import {
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getTrips } from '../actions/bikes'
import isAndroid from '../helpers/platform'
import parseDate, { minsAndSecsLetters, secsDiff } from '../helpers/parseDate'
import { dotsOnThousands } from '../helpers/parseCost'
import colors, { mainContainerStyle, logoMedium } from '../styles'

const mapStateToProps = state => ({
  loading: state.bikes.loading,
  token: state.user.token,
  trips: state.bikes.trips,
})

const mapDispatchToProps = {
  getTrips,
}

const Header = () => (
  <View style={styles.headerBackground}>
    <View style={styles.headerContainer}>
      <Text style={styles.dayHeader}>Día</Text>
      <Text style={styles.timeHeader}>Hora</Text>
      <Text style={styles.durationHeader}>Duración</Text>
      <Text style={styles.costHeader}>Costo</Text>
    </View>
  </View>
)

const Trip = ({ startedAt, finishedAt, cost, isBottom }) => (
  <View style={isBottom ? styles.bottomTripContainer : styles.tripContainer}>
    <View style={styles.dayColumn}>
      <Text style={styles.tripText}>{parseDate(startedAt)}</Text>
    </View>
    <View style={styles.TimeColumn}>
      <Text style={styles.timeColumn}>{parseDate(startedAt, 'onlyTime')}</Text>
    </View>
    <View style={styles.durationColumn}>
      <Text style={styles.tripText}>
        {minsAndSecsLetters(secsDiff(startedAt, finishedAt))}
      </Text>
    </View>
    <View style={styles.costColumn}>
      <Text style={styles.costText}>$ {dotsOnThousands(cost)}</Text>
    </View>
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

  renderTrip = ({ item, index }) => {
    const isBottom = index === this.props.trips.length - 1
    return (
      <Trip
        key={index}
        isBottom={isBottom}
        startedAt={item.startedAt}
        finishedAt={item.finishedAt}
        cost={item.cost}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../styles/logo/logos-03.png')}
          style={styles.logo}
        />
        <View style={styles.listContainer}>
          <FlatList
            data={this.props.trips}
            renderItem={this.renderTrip}
            ListHeaderComponent={Header}
            ItemSeparatorComponent={Separator}
            stickyHeaderIndices={[0]}
            refreshControl={
              <RefreshControl
                onRefresh={() =>
                  this.props.getTrips({ token: this.props.token })
                }
                refreshing={this.props.loading}
                tintColor={colors.SeaBuckthorn}
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
  isBottom: PropTypes.bool.isRequired,
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
    ...mainContainerStyle,
  },
  logo: {
    ...logoMedium,
    marginTop: -30,
  },
  listContainer: {
    height: isAndroid ? 390 : 360,
    width: isAndroid ? 300 : 280,
    marginBottom: isAndroid ? 0 : 20,
    marginTop: -20,
  },
  headerBackground: {
    height: 40,
    backgroundColor: colors.PuertoRico,
  },
  headerContainer: {
    height: 40,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: colors.Mirage,
    backgroundColor: colors.Mirage,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tripContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.White,
  },
  bottomTripContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.White,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  dayHeader: {
    fontSize: isAndroid ? 16 : 18,
    fontWeight: 'bold',
    color: colors.White,
    marginLeft: 8,
  },
  timeHeader: {
    fontSize: isAndroid ? 16 : 18,
    fontWeight: 'bold',
    marginLeft: 3,
    color: colors.White,
  },
  durationHeader: {
    fontSize: isAndroid ? 16 : 18,
    fontWeight: 'bold',
    color: colors.White,
  },
  costHeader: {
    fontSize: isAndroid ? 16 : 18,
    fontWeight: 'bold',
    color: colors.White,
  },

  tripText: {
    fontSize: isAndroid ? 12 : 14,
    color: colors.DG,
  },
  costText: {
    fontSize: isAndroid ? 12 : 14,
    color: colors.Punch,
  },
  separator: {
    height: 1,
    backgroundColor: colors.BG,
  },
  dayColumn: {
    width: isAndroid ? 72 : 66,
    marginLeft: -3,
  },
  timeColumn: {
    width: isAndroid ? 72 : 68,
  },
  durationColumn: {
    width: isAndroid ? 72 : 68,
  },
  costColumn: {
    width: isAndroid ? 60 : 56,
    alignItems: 'flex-end',
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)
