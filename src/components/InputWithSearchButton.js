import React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { COLORS, BORDERRADIUS, SPACING } from '../styles/gstyles';

const InputWithSearchButton = ({ placeholder, onPress }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
            />
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Image source={require('../assets/icons/icon_search.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        backgroundColor: COLORS.white,
        color: COLORS.black,
        borderRadius: BORDERRADIUS.radius_8,
        flex: 1,
        marginRight: SPACING.space_10,
        paddingLeft: SPACING.space_12,
        marginVertical: SPACING.space_4,
    },
    button: {
        backgroundColor: COLORS.orange,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_8,
    },
    icon: {
        width: 20,
        height: 20,
    },
};

export default InputWithSearchButton;