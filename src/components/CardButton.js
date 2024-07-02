import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BORDERRADIUS, COLORS, SPACING, FONTSIZE } from '../styles/gstyles';

const CardButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={icon} style={styles.card_icon} />
        <Text style={styles.card_title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    card: {
      padding: SPACING.space_16,
      backgroundColor: COLORS.white,
      borderRadius: BORDERRADIUS.radius_8,
      margin: SPACING.space_4,
      width: 140,
    },
    card_icon: {
      alignSelf: 'center'
    },
    card_title: {
      color: COLORS.black,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: FONTSIZE.size_12,
      marginTop: SPACING.space_4
    },
  });

export default CardButton;