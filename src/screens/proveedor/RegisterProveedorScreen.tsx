import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { BORDERRADIUS, COLORS, SPACING } from '../../styles/gstyles';
import ButtonPrimary from '../../components/ButtonPrimary';

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
      <ScrollView>
      <Text style={styles.titulo}>REGISTRAR PROVEEDOR</Text>
       <Text style={styles.parrafo}>Complete los siguientes datos para registrar un proveedor.</Text>
      <Text style={styles.label}>RUC</Text>
      <TextInput style={styles.input} value={ruc} onChangeText={setRuc} />
      <Text style={styles.label}>Razón Social</Text>
      <TextInput style={styles.input} value={razon_social} onChangeText={setRazonSocial} />
      <Text style={styles.label}>Dirección</Text>
      <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />
      <Text style={styles.label}>Distrito</Text>
      <TextInput style={styles.input} value={distrito} onChangeText={setDistrito} />
      <Text style={styles.label}>Provincia</Text>
      <TextInput style={styles.input} value={provincia} onChangeText={setProvincia} />
      <Text style={styles.label}>Departamento</Text>
      <TextInput style={styles.input} value={departamento} onChangeText={setDepartamento} />
      <ButtonPrimary title="Registrar Proveedor" onPress={handleRegister} />
      </ScrollView>
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: SPACING.space_20, 
    backgroundColor: COLORS.gray2 
  },
  input: { 
    height: 40, 
    backgroundColor: COLORS.white,
    borderRadius: BORDERRADIUS.radius_8,
    marginVertical: SPACING.space_4, 
    paddingHorizontal: SPACING.space_10 
  },
  titulo:{
    marginVertical: SPACING.space_8,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  parrafo:{
    marginVertical: SPACING.space_8,
    color: COLORS.black,
    // textAlign: 'center'
  },
  label: {
    color: COLORS.gray,
    marginTop: SPACING.space_4
  }
});
