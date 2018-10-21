import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import colors from '../styles'

class Input extends PureComponent {
  handleChange = value => {
    this.props.onChange(this.props.name, value)
  }

  handleTouch = () => {
    this.props.onTouch(this.props.name)
  }

  render() {
    const { label, error, ...rest } = this.props
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.handleChange}
          onBlur={this.handleTouch}
          placeholder={label}
          {...rest}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    )
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: colors.BG,
    borderRadius: 4,
    marginBottom: 5,
    color: colors.BK,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  error: {
    marginTop: 1,
    marginBottom: 12,
    fontStyle: 'italic',
    fontSize: 14,
    color: colors.YO,
  },
})

export default Input
