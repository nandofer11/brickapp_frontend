import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../styles/gstyles';
import ButtonLight from '../../components/ButtonLight';
import ButtonDarken from '../../components/ButtonDarken';

export default function SelectTypeRegisterScreen() {
  const navigation = useNavigation();
  
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
     <Image style={styles.logo} source={require('../../../assets/images/logoColor.png')} />
      <Text style={styles.paragraph}>Solución en la Gestión de Industrias Ladrilleras</Text>
      <Text style={{fontSize: FONTSIZE.size_24, marginBottom: SPACING.space_30}}>¿Cómo desea registrarse?</Text>

      <ButtonLight 
        onPress={() => navigation.navigate('RegisterEmpresa')}
        title="Empresa"
        disabled={loading}
        loading={loading} />
        <ButtonDarken
        onPress={() => navigation.navigate('RegisterProveedor')} 
        title="Proveedor"
        disabled={loading}
        loading={loading}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: COLORS.gray2
  },
  logo: {
    alignSelf: 'center',
    marginBottom: SPACING.space_24
  },
  paragraph: {
    color: COLORS.gray,
    fontSize: FONTSIZE.size_12,
    textAlign: 'center',
    marginBottom: SPACING.space_100
  },
});
