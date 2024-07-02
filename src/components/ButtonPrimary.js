import React from 'react'
import { ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS } from '../styles/gstyles'

const ButtonPrimary = ({ onPress, title, disabled, loading }) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={onPress}
      disabled={disabled}>
      {loading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default ButtonPrimary

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8
  },
  text: {
    color: COLORS.white,
    fontSize: 14,
  }
})