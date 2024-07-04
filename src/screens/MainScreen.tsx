import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE, SPACING } from '../styles/gstyles';
import ButtonLight from '../components/ButtonLight';
import ButtonDarken from '../components/ButtonDarken';

export default function MainScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/logoColor.png')} />
      <Text style={styles.paragraph}>Solución en la Gestión de Industrias Ladrilleras</Text>
      <Text style={{marginBottom: SPACING.space_10, color: COLORS.black}}>Iniciar sesión como:</Text>

      <ButtonLight 
        onPress={() => { navigation.navigate('LoginEmpresa') }}
        title="Empresa"
        disabled={loading}
        loading={loading} />

        <ButtonDarken
        onPress={()=>{navigation.navigate('LoginProveedor')}}
        title="Proveedor"
        disabled={loading}
        loading={loading}  /> 
        
      <Text onPress={() => navigation.navigate('SelectTypeRegister')} style={{marginTop: SPACING.space_20}}>Registrarse</Text>
      <Text style={{marginTop: SPACING.space_100}}>Versión 1.0</Text>

      {/* <Button title="Empresa" onPress={() => navigation.navigate('LoginEmpresa')} /> */}
      {/* <Button title="Proveedor" onPress={() => navigation.navigate('LoginProveedor')} /> */}
      {/* <Button title="Registrarse" onPress={() => navigation.navigate('SelectTypeRegister')} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
