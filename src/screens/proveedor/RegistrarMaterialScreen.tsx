import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import ButtonPrimary from '../../components/ButtonPrimary';
import { COLORS, FONTSIZE, SPACING } from '../../styles/gstyles';

export default function RegistrarMaterialScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [peso, setPeso] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');

  const handleRegister = async () => {
    if (!nombre || !descripcion || !peso || !precioUnitario) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    console.log("Usuario:", user); // Imprimir el objeto `user` para verificar su estructura

    if (!user || !user.Proveedor_id_proveedor) {
      Alert.alert('Error', 'Información del proveedor no disponible.');
      return;
    }

    const materialData = {
      nombre,
      descripcion,
      peso: parseFloat(peso),
      precio_unitario: parseFloat(precioUnitario),
      Proveedor_id_proveedor: user.Proveedor_id_proveedor,
    };

    console.log("Enviando datos: ", materialData); // Imprimir los datos enviados

    try {
      const response = await api.post('/materiales', materialData);
      console.log('Respuesta del servidor:', response.data); // Imprimir la respuesta del servidor

      Alert.alert('Éxito', 'Material registrado con éxito');
      navigation.goBack();
    } catch (error) {
      console.error('Error al registrar el material:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Error al registrar el material.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete los siguientes campos para registrar un nuevo material.</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Peso"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Precio Unitario"
        value={precioUnitario}
        onChangeText={setPrecioUnitario}
        keyboardType="numeric"
      />
      <ButtonPrimary title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_20,
    backgroundColor: COLORS.gray2,
  },
  title: {
    fontSize: FONTSIZE.size_14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.black
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});
