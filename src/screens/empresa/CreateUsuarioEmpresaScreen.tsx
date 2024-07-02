import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

export default function CreateUsuarioEmpresaScreen() {
  const [nombre_completo, setNombreCompleto] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [Rol_id_rol, setRolIdRol] = useState(''); // Ajusta según cómo obtendrás los roles
  const navigation = useNavigation();
  const route = useRoute();
  const { Empresa_id_empresa } = route.params;

  const handleRegister = async () => {
    try {
      const response = await api.post('/auth/register', {
        nombre_completo, usuario, contraseña, Empresa_id_empresa, Rol_id_rol
      });
      if (response.data) {
        Alert.alert('Usuario creado exitosamente');
        navigation.navigate('EmpresaHome');
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
      <Text>Rol</Text>
      <TextInput style={styles.input} value={Rol_id_rol} onChangeText={setRolIdRol} />
      <Button title="Registrar Usuario" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }
});
