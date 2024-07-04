import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { BORDERRADIUS, COLORS, SPACING } from '../../styles/gstyles';
import ButtonPrimary from '../../components/ButtonPrimary';
// import {  } from 'react-native-safe-area-context';
// import {  } from 'react-native-reanimated/lib/typescript/Animated';

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
      <ScrollView>
      <Text style={styles.titulo}>REGISTRAR EMPRESA</Text>
      <Text style={styles.parrafo}>Complete los siguientes datos para registrar una empresa.</Text>
      <Text style={styles.label}>RUC</Text>
      <TextInput style={styles.input} value={ruc} onChangeText={setRuc} />
      <Text style={styles.label}>Nombre Comercial</Text>
      <TextInput style={styles.input} value={nombre_comercial} onChangeText={setNombreComercial} />
      <Text style={styles.label}>Dirección</Text>
      <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />
      <Text style={styles.label}>Teléfono</Text>
      <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Web</Text>
      <TextInput style={styles.input} value={web} onChangeText={setWeb} />
      <Text style={styles.label}>Distrito</Text>
      <TextInput style={styles.input} value={distrito} onChangeText={setDistrito} />
      <Text style={styles.label}>Provincia</Text>
      <TextInput style={styles.input} value={provincia} onChangeText={setProvincia} />
      <Text style={styles.label}>Departamento</Text>
      <TextInput style={styles.input} value={departamento} onChangeText={setDepartamento} />
      <ButtonPrimary title="Registrar Empresa" onPress={handleRegister} />
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
