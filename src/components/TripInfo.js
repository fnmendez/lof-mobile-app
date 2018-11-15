import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, View } from 'react-native'

import colors from '../styles'

class Duration extends PureComponent {
  state = {
    totalSeconds: 0,
  }

  componentDidMount() {
    this.intervalId = setInterval(
      () =>
        this.setState(({ totalSeconds }) => ({
          totalSeconds: totalSeconds + 1,
        })),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  renderTime = () => {
    const time = this.state.totalSeconds
    const seconds = String(time % 60).padStart(2, '0')
    const minutes = String(Math.floor(time / 60)).padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  render() {
    return <Text style={styles.text}>{this.renderTime()}</Text>
  }
}

const TripInfo = props => {
  const { startedAt, bike } = props
  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Inicio</Text>
          <Text style={styles.label}>Bicicleta</Text>
          <Text style={styles.label}>Costo</Text>
          <Text style={styles.label}>Duración</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.text}>{startedAt}</Text>
          <Text style={styles.text}>#{bike.rubi_id}</Text>
          <Text style={styles.text}>$ 1.230</Text>
          <Duration />
        </View>
      </View>
    </View>
  )
}

TripInfo.propTypes = {
  bike: PropTypes.object.isRequired,
  startedAt: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    margin: 30,
  },
  labelContainer: {
    justifyContent: 'flex-start',
    marginRight: 15,
  },
  descriptionContainer: {
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  label: {
    color: colors.W,
    fontSize: 22,
    textAlign: 'left',
  },
  text: {
    color: colors.PW,
    fontSize: 22,
    textAlign: 'right',
  },
})

export default TripInfo
