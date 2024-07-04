import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { COLORS, FONTSIZE, SPACING, BORDERRADIUS } from '../../styles/gstyles';

export default function PedidosProveedorScreen() {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook para detectar si la pantalla está enfocada

  const fetchPedidos = async () => {
    try {
      const url = `/pedido/proveedor/${user.Proveedor_id_proveedor}`;
      console.log("Fetching pedidos from URL:", url); // Log the URL
      const response = await api.get(url);
      console.log("Pedidos fetched:", response.data); // Log the response
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchPedidos(); // Volver a cargar los pedidos cuando la pantalla está enfocada
    }
  }, [isFocused]);


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetallePedidoProveedor', { pedido: item })}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.Usuario.Empresa.nombre_comercial}</Text>
        <Text style={styles.cardSubtitle}>Fecha de Pedido: {new Date(item.fecha_pedido).toLocaleDateString()}</Text>
        <Text style={styles.cardSubtitle}>Estado: {item.estado}</Text>
        <Text style={styles.cardPrice}>
          Subtotal: S/. {item.DetallePedidos && Array.isArray(item.DetallePedidos) && item.DetallePedidos.length > 0 ?
            item.DetallePedidos.reduce((acc, detalle) => acc + detalle.subtotal, 0) :
            'No disponible'
          }
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos Recibidos</Text>
      <FlatList
        data={pedidos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_pedido.toString()}
        contentContainerStyle={styles.listContainer}
      />
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
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    marginBottom: SPACING.space_16,
    color: COLORS.black
  },
  listContainer: {
    paddingBottom: SPACING.space_20,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_10,
    marginBottom: SPACING.space_10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cardSubtitle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.gray,
    marginTop: SPACING.space_4,
  },
  cardPrice: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginTop: SPACING.space_4,
  },
});
