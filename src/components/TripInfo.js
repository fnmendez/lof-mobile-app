import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, View } from 'react-native'
import AD from 'react-native-vector-icons/AntDesign'
import FT from 'react-native-vector-icons/Feather'
import FA from 'react-native-vector-icons/FontAwesome'
import MI from 'react-native-vector-icons/MaterialIcons'

import isAndroid from '../helpers/platform'
import parseDate, { minsAndSecs, now, toSeconds } from '../helpers/parseDate'
import { dotsOnThousands } from '../helpers/parseCost'
import colors from '../styles'

class Variables extends PureComponent {
  state = {
    totalSecs: now() - toSeconds(this.props.startedAt),
  }

  componentDidMount() {
    this.intervalId = setInterval(
      () =>
        this.setState(({ totalSecs }) => ({
          totalSecs: totalSecs + 1,
        })),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getCost = () => {
    const { totalSecs } = this.state
    if (totalSecs < 1800) return 300
    else return 300 + 100 * (1 + Math.floor((totalSecs - 1800) / 600))
  }

  render() {
    return (
      <>
        <Text style={styles.text}>$ {dotsOnThousands(this.getCost())}</Text>
        <Text style={styles.text}>{minsAndSecs(this.state.totalSecs)}</Text>
      </>
    )
  }
}

const TripInfo = props => {
  const { startedAt, bike } = props
  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <View style={styles.labelsContainer}>
          <View style={styles.labelContainer}>
            <FT name="flag" color={colors.PuertoRico} size={15} />
            <Text style={styles.label}>Inicio</Text>
          </View>
          <View style={styles.labelContainer}>
            <MI name="directions-bike" color={colors.PuertoRico} size={15} />
            <Text style={styles.label}>Bicicleta</Text>
          </View>
          <View style={styles.labelContainer}>
            <FA
              name="dollar"
              color={colors.PuertoRico}
              size={15}
              style={styles.extraMargin}
            />
            <Text style={{ ...styles.label, ...styles.cost }}>Costo</Text>
          </View>
          <View style={styles.labelContainer}>
            <AD name="clockcircleo" color={colors.PuertoRico} size={15} />
            <Text style={styles.label}>Duración</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.text}>{parseDate(startedAt, 'onlyTime')}</Text>
          <Text style={styles.text}>nº{bike.rubi_id}</Text>
          <Variables startedAt={startedAt} />
        </View>
      </View>
    </View>
  )
}

Variables.propTypes = {
  startedAt: PropTypes.string.isRequired,
}

TripInfo.propTypes = {
  bike: PropTypes.object.isRequired,
  startedAt: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  topContainer: {
    width: isAndroid ? 290 : 270,
    backgroundColor: colors.White,
    borderRadius: 15,
    margin: 12,
    marginTop: 25,
    padding: 8,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    margin: 20,
  },
  labelsContainer: {
    justifyContent: 'flex-start',
    marginRight: 15,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionContainer: {
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  label: {
    color: colors.G,
    fontSize: isAndroid ? 18 : 22,
    textAlign: 'left',
    margin: 2,
    marginLeft: isAndroid ? 8 : 6,
    marginRight: 4,
  },
  text: {
    color: colors.Mirage,
    fontSize: isAndroid ? 18 : 22,
    textAlign: 'right',
    margin: 2,
    marginLeft: 4,
  },
  extraMargin: {
    marginLeft: 3,
  },
  cost: {
    marginLeft: isAndroid ? 11 : 9,
  },
})

export default TripInfo
