import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import colors from '../styles'

const FinishTripTutorial = () => (
  <View style={styles.topContainer}>
    <ScrollView
      centerContent={true}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Finish trip tutorial</Text>
      </View>
    </ScrollView>
  </View>
)

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BK,
  },
  container: {
    height: 800,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BK,
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.BK,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    textAlign: 'center',
    color: colors.W,
    fontSize: 20,
    fontWeight: '900',
  },
})

export default FinishTripTutorial
