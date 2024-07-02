import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function RegisterProveedorScreen() {
  const [ruc, setRuc] = useState('');
  const [razon_social, setRazonSocial] = useState('');
  const [direccion, setDireccion] = useState('');
  const [distrito, setDistrito] = useState('');
  const [provincia, setProvincia] = useState('');
  const [departamento, setDepartamento] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await api.post('/proveedores', {
        ruc, razon_social, direccion, distrito, provincia, departamento
      });
      if (response.data) {
        Alert.alert('Registro exitoso');
        navigation.navigate('CreateUsuarioProveedor', { Proveedor_id_proveedor: response.data.id_proveedor });
      } else {
        Alert.alert('Error en el registro');
      }
    } catch (error) {
      Alert.alert('Error en el registro');
    }
  };

  return (
    <View style={styles.container}>
      <Text>RUC</Text>
      <TextInput style={styles.input} value={ruc} onChangeText={setRuc} />
      <Text>Razón Social</Text>
      <TextInput style={styles.input} value={razon_social} onChangeText={setRazonSocial} />
      <Text>Dirección</Text>
      <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />
      <Text>Distrito</Text>
      <TextInput style={styles.input} value={distrito} onChangeText={setDistrito} />
      <Text>Provincia</Text>
      <TextInput style={styles.input} value={provincia} onChangeText={setProvincia} />
      <Text>Departamento</Text>
      <TextInput style={styles.input} value={departamento} onChangeText={setDepartamento} />
      <Button title="Registrar Proveedor" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }
});
