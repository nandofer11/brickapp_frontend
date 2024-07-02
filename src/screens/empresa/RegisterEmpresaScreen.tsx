import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function RegisterEmpresaScreen() {
  const [ruc, setRuc] = useState('');
  const [nombre_comercial, setNombreComercial] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [web, setWeb] = useState('');
  const [distrito, setDistrito] = useState('');
  const [provincia, setProvincia] = useState('');
  const [departamento, setDepartamento] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await api.post('/empresas', {
        ruc, nombre_comercial, direccion, telefono, email, web, distrito, provincia, departamento
      });
      if (response.data) {
        Alert.alert('Registro exitoso');
        navigation.navigate('CreateUsuarioEmpresa', { Empresa_id_empresa: response.data.id_empresa });
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
      <Text>Nombre Comercial</Text>
      <TextInput style={styles.input} value={nombre_comercial} onChangeText={setNombreComercial} />
      <Text>Dirección</Text>
      <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />
      <Text>Teléfono</Text>
      <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} />
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Web</Text>
      <TextInput style={styles.input} value={web} onChangeText={setWeb} />
      <Text>Distrito</Text>
      <TextInput style={styles.input} value={distrito} onChangeText={setDistrito} />
      <Text>Provincia</Text>
      <TextInput style={styles.input} value={provincia} onChangeText={setProvincia} />
      <Text>Departamento</Text>
      <TextInput style={styles.input} value={departamento} onChangeText={setDepartamento} />
      <Button title="Registrar Empresa" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }
});
