import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../styles/gstyles'

const ButtonLight = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btnContainer}>
        <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonLight

const styles = StyleSheet.create({
    btnContainer:{
        backgroundColor: COLORS.gray2,
        paddingHorizontal: 20,
        alignItems:'center',
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.orange
    },
    text: {
        color: COLORS.orange,
        fontSize: 14,
    }
})