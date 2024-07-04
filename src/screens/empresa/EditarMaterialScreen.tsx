import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import ButtonPrimary from '../../components/ButtonPrimary';
import { COLORS } from '../../styles/gstyles';

export default function EditarMaterialScreen({ route, navigation }) {
  const { material } = route.params;
  const { user } = useContext(AuthContext);
  const [nombre, setNombre] = useState(material.nombre);
  const [descripcion, setDescripcion] = useState(material.descripcion);
  const [peso, setPeso] = useState(material.peso.toString());
  const [precioUnitario, setPrecioUnitario] = useState(material.precio_unitario.toString());

  const handleUpdate = async () => {
    if (!nombre || !descripcion || !peso || !precioUnitario) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const materialData = {
      nombre,
      descripcion,
      peso: parseFloat(peso),
      precio_unitario: parseFloat(precioUnitario),
    };

    try {
      await api.put(`/materiales/${material.id_material}`, materialData);
      Alert.alert('Éxito', 'Material actualizado con éxito');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar el material:', error);
      Alert.alert('Error', 'Error al actualizar el material.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Material</Text>
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
      <ButtonPrimary title="Actualizar" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.gray2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
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
