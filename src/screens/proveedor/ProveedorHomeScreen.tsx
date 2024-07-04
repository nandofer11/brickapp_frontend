import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { COLORS, FONTSIZE, SPACING } from '../../styles/gstyles';
import CardButton from '../../components/CardButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import ButtonDarken from '../../components/ButtonDarken';

export default function ProveedorHomeScreen({ navigation }) {
  const { user, signOut } = useContext(AuthContext);
  const [razonSocial, setRazonSocial] = useState('');

  useEffect(() => {
    if (!user || !user.Proveedor_id_proveedor) {
      // Redirigir al usuario a la pantalla de inicio de sesión si no está autenticado
      navigation.navigate('Auth');
      return;
    }

    console.log('ID del proveedor:', user.Proveedor_id_proveedor); // Verificar que este valor no sea null o undefined
    
    const fetchProveedor = async () => {
      try {
        const response = await api.get(`/proveedores/${user.Proveedor_id_proveedor}`);
        console.log(response.data);
        setRazonSocial(response.data.razon_social);
      } catch (error) {
        console.error('Error al obtener proveedor:', error);
      }
    };
    
    // console.log('ID del proveedor:', user.Proveedor_id_proveedor); // Verificar que este valor no sea null o undefined
    fetchProveedor();
  }, [user, navigation]);

  if (!user) {
    return null; // O mostrar una pantalla de carga
  }

  const data = [
    { title: 'Materiales', icon: require('../../../assets/icons/icon_material.png'), onPress: () => navigation.navigate('MaterialesProveedor') },
    { title: 'Pedidos', icon: require('../../../assets/icons/icon_pedido_proveedor.png'), onPress: () => navigation.navigate('PedidosProveedor') },
    { title: 'Opción 2', icon: require('../../../assets/icons/icon_material.png'), onPress: () => console.log('Opción 2 presionada') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.razonSocialText}>{user.usuario}</Text>
          <Text style={styles.razonSocialText}>{razonSocial}</Text>
        </View>
        <View style={styles.icons}>
          <Icon name="bell" size={24} color={COLORS.black} style={styles.icon} />
          <Icon name="cog" size={24} color={COLORS.black} style={styles.icon} />
        </View>
        
      </View>

      <FlatList
        style={styles.flatList}
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <CardButton title={item.title} icon={item.icon} onPress={item.onPress} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ButtonDarken title={'Cerrar sesión'} onPress={signOut}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    padding: SPACING.space_18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  welcomeText: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONTSIZE.size_24,
  },
  razonSocialText: {
    color: COLORS.black,
    fontSize: FONTSIZE.size_14,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: SPACING.space_12,
  },
  flatList: {
    flexGrow: 0,
    alignSelf: 'center',
  },
});
