import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../styles/gstyles';
import { useNavigation } from '@react-navigation/native';
import ButtonLight from '../../components/ButtonLight';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function LoginEmpresaScreen() {

  const navigation = useNavigation();

  const usuarioRef = useRef();
  const contraseñaRef = useRef();

  const [usuario, setUsuario] = useState('ofernandez');
  const [contraseña, setContraseña] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);     //Variable para manejar la visibilidad de la contraseña
  const { signIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!usuario || !contraseña) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor completa los campos usuario y contraseña. ⛔',
      });
      return;
    }

    try {
      const response = await api.post('/auth/login', { usuario, contraseña });
      // console.log(response);
      if (response.data.token) {
        signIn(response.data, 'empresa');
        Toast.show({
          type: 'success',
          text1: 'Éxito',
          text2: 'Inicio de sesión exitoso',
        });
        console.log(response.data.token);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error en el inicio de sesión',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error en el inicio de sesión',
      });
      console.log(error)
    }
    // console.log('hola')
  };


  //Funcion para alternar el estado de visibilidad de la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require('../../../assets/images/logoColor.png')} />
      <Text style={styles.paragraph}>Gestión de pedidos y materiales.</Text>
      <Text style={styles.title}>INICIAR SESIÓN</Text>

      <TextInput
        ref={usuarioRef}
        style={styles.input}
        placeholder="Ingresa usuario"
        autoCapitalize="none"
        placeholderTextColor={COLORS.black}
        value={usuario}
        onChangeText={(usuario) => setUsuario(usuario)}
      />

      <View style={styles.containerInputPass}>
        <TextInput
          style={[styles.input, { marginVertical: SPACING.space_16 }]}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor={COLORS.black}
          value={contraseña}
          secureTextEntry={!showPassword}
          onChangeText={(text) => setContraseña(text)}
        />
        <FontAwesome6
          name={showPassword ? 'eye-slash' : 'eye'}
          size={18}
          onPress={toggleShowPassword}
          style={styles.iconPass}
        />
      </View>

      <ButtonPrimary
        onPress={handleLogin}
        title="Ingresar"
        disabled={loading}
        loading={loading} />

<Text style={{color: COLORS.gray, textAlign: 'center', marginTop: SPACING.space_18}}>Versión 1.0</Text>

      <Toast />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray2,
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    alignSelf: 'center',
    marginBottom: SPACING.space_24
  },

  title: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_extrabold,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SPACING.space_28,
    fontWeight: 'bold'
  },
  paragraph: {
    color: COLORS.gray,
    fontSize: FONTSIZE.size_12,
    textAlign: 'center',
    marginBottom: SPACING.space_100
  },
  labelInput: {
    color: COLORS.gray2,
    marginBottom: SPACING.space_8
  },
  containerInputPass: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1
  },
  input: {
    backgroundColor: COLORS.white,
    textAlign: 'center',
    color: COLORS.black,
    borderRadius: BORDERRADIUS.radius_8,
    width: '100%',
    paddingVertical: SPACING.space_12
  },
  iconPass: {
    marginLeft: -40,
    color: COLORS.gray
  },
  subTitle: {
    fontSize: FONTSIZE.size_14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: SPACING.space_24,
    color: COLORS.gray2
  },
  errorText: {
    fontSize: FONTSIZE.size_10,
    color: COLORS.gray2,
    backgroundColor: 'red',
    padding: SPACING.space_4,

  }
});
