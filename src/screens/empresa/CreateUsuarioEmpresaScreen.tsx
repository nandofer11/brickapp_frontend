import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { BORDERRADIUS, COLORS, SPACING } from '../../styles/gstyles';
import ButtonPrimary from '../../components/ButtonPrimary';
import { AuthContext } from '../../contexts/AuthContext';
import { Picker } from '@react-native-picker/picker';

export default function CreateUsuarioEmpresaScreen({ route }) {
  const { Empresa_id_empresa } = route.params;
  const [nombre_completo, setNombreCompleto] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!rol) {
      Alert.alert('Error', 'Debe seleccionar un rol para el usuario.');
      return;
    }

    // Log the selected role ID before attempting to register
    console.log('Selected Rol_id_rol:', rol);
    console.log('Empresa_id_empresa:', Empresa_id_empresa);

    try {
      const response = await api.post('auth/register', {
        nombre_completo,
        usuario,
        contraseña,
        Empresa_id_empresa,
        Rol_id_rol: rol
      });

      console.log("response: " , response.data)

      if (response.data) {
        Alert.alert('Registro exitoso');
        // Iniciar sesión automáticamente después del registro
        await signIn({ usuario, contraseña });
        navigation.navigate('Home');
      } else {
        Alert.alert('Error en el registro', 'No se pudo completar el registro.');
      }
    } catch (error) {
      Alert.alert('Error en el registro', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>REGISTRAR USUARIO</Text>
        <Text style={styles.parrafo}>Complete los siguientes datos para registrar un usuario para la empresa.</Text>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput style={styles.input} value={nombre_completo} onChangeText={setNombreCompleto} />
        <Text style={styles.label}>Usuario</Text>
        <TextInput style={styles.input} value={usuario} onChangeText={setUsuario} />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} value={contraseña} onChangeText={setContraseña} secureTextEntry />

        <Text style={styles.label}>Rol</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={rol}
            onValueChange={(itemValue) => {
              setRol(itemValue);
              console.log('Selected Rol_id_rol:', itemValue); // Log the selected role ID when it's changed
            }}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione un rol" value="" />
            <Picker.Item label="Administrador" value="1" />
            <Picker.Item label="Invitado" value="2" />
          </Picker>
        </View>

        <ButtonPrimary title="Registrar Usuario" onPress={handleRegister} />
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
  titulo: {
    marginVertical: SPACING.space_8,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  parrafo: {
    marginVertical: SPACING.space_8,
    color: COLORS.black,
  },
  label: {
    color: COLORS.gray,
    marginTop: SPACING.space_4
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_8,
    marginBottom: SPACING.space_10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
