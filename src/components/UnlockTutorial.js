import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import isAndroid from '../helpers/platform'
import colors from '../styles'

class UnlockTutorial extends Component {
  // Initial state
  state = {
    entries: [
      require('../styles/tutorial/unlock-1.png'),
      require('../styles/tutorial/unlock-2.png'),
      require('../styles/tutorial/unlock-3.png'),
      require('../styles/tutorial/unlock-4.png'),
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Cómo iniciar un viaje</Text>
        </View>
        <View style={styles.body}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    width: 220,
    borderRadius: 8,
    backgroundColor: colors.White,
    paddingBottom: 10,
    marginBottom: 20,
    marginTop: -10,
  },
  header: {
    height: 40,
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
})

export default UnlockTutorial
