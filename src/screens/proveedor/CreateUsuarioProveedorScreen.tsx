import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function CreateUsuarioProveedorScreen() {
  const [nombre_completo, setNombreCompleto] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { Proveedor_id_proveedor } = route.params;
  const { signIn } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const response = await api.post('/authProveedor/register', {
        nombre_completo, usuario, contraseña, Proveedor_id_proveedor
      });
      if (response.data) {
        Alert.alert('Usuario creado exitosamente');
        // Iniciar sesión automáticamente después del registro
        await signIn({ usuario, contraseña });
        navigation.navigate('ProveedorHome');
      } else {
        Alert.alert('Error en el registro del usuario');
      }
    } catch (error) {
      Alert.alert('Error en el registro del usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre Completo</Text>
      <TextInput style={styles.input} value={nombre_completo} onChangeText={setNombreCompleto} />
      <Text>Usuario</Text>
      <TextInput style={styles.input} value={usuario} onChangeText={setUsuario} />
      <Text>Contraseña</Text>
      <TextInput style={styles.input} value={contraseña} onChangeText={setContraseña} secureTextEntry />
      <Button title="Registrar Usuario" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }
});
