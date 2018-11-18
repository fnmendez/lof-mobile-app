import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import isAndroid from '../helpers/platform'
import colors, { buttonStyle } from '../styles'

class UnlockTutorial extends Component {
  // Initial state
  state = {
    entries: [
      require('../styles/tutorial/lock-1.png'),
      require('../styles/tutorial/lock-2.png'),
      require('../styles/tutorial/lock-3.png'),
      require('../styles/tutorial/lock-4.png'),
    ],
    activeSlide: 0,
  }

  renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item} style={styles.image} />
    </View>
  )

  render() {
    const { entries, activeSlide } = this.state
    return (
      <Modal
        visible={this.props.visible}
        animationType="fade"
        transparent={true}
        onRequestClose={this.props.onOutsideClick}
      >
        <View style={styles.modalContentContainer}>
          <View style={styles.modalContent}>
            <View style={styles.body}>
              <View style={styles.header}>
                <Text style={styles.title}>Cómo terminar un viaje</Text>
              </View>
              <Carousel
                ref={c => {
                  this._carousel = c
                }}
                data={entries}
                renderItem={this.renderItem}
                sliderWidth={220}
                onSnapToItem={index => this.setState({ activeSlide: index })}
                itemWidth={200}
              />
              <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.dotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>
            <TouchableOpacity
              style={styles.readyButtonContainer}
              onPress={this.props.onOutsideClick}
            >
              <Text style={styles.buttonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

UnlockTutorial.propTypes = {
  onOutsideClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  modalContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: 400,
    width: isAndroid ? 300 : 280,
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.Lochinvar,
  },
  header: {
    height: 40,
    alignSelf: 'stretch',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.LilacBush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: isAndroid ? 18 : 20,
    fontWeight: isAndroid ? '200' : '500',
    color: colors.White,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: colors.White,
    alignItems: 'center',
    borderRadius: 8,
  },
  slide: {
    backgroundColor: colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    height: 230,
    width: 230,
  },
  paginationContainer: {
    paddingTop: 10,
    marginBottom: -22,
  },
  dotStyle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: -2,
    backgroundColor: colors.LilacBush,
  },
  readyButtonContainer: {
    ...buttonStyle,
    backgroundColor: colors.Mirage,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.White,
    fontSize: 20,
    fontWeight: '900',
  },
})

export default UnlockTutorial
