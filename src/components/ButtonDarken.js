import React from 'react'
import { ActivityIndicator, TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { COLORS } from '../styles/gstyles'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

const ButtonDarken = ({ onPress, title, disabled, loading, icon, iconName }) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={onPress}
      disabled={disabled}>
      {loading ? <ActivityIndicator color={COLORS.white} /> : (
        <View style={styles.iconTextContainer}>
          {icon && <FontAwesome6 name={iconName} size={16} color={COLORS.white} style={styles.icon} />}
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default ButtonDarken

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8
  },
  text: {
    color: COLORS.white,
    fontSize: 14,
  }
})