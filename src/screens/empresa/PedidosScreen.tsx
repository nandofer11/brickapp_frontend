import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SPACING, BORDERRADIUS } from '../../styles/gstyles';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import ButtonDarken from '../../components/ButtonDarken';
// Para formatear las fechas
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function PedidosScreen({navigation}) {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await api.get('/pedido');
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const getColorEstado = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'orange';
      case 'aceptado':
        return 'green';
      case 'cancelado':
        return 'red';
      case 'entregado':
        return 'blue';
      default:
        return 'black';
    }
  };

  const renderPedido = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('VerDetallePedidoScreen', { pedidoId: item.id_pedido })}>
      <View style={styles.card}>
        <View>
        <Text style={styles.proveedor}>{item.Proveedor.razon_social}</Text>
        <Text style={styles.fechaPedido}>Fecha de pedido: {format(item.fecha_pedido, "d 'de' MMMM yyyy", { locale: es })}</Text>
        </View>
        
        <Text style={[styles.estado, { color: getColorEstado(item.estado) }]}>{item.estado}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ButtonDarken title={'Realizar pedido'} onPress={()=>{navigation.navigate('DetallePedido')}}/>
      <Text style={styles.title}>Listado de pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id_pedido.toString()}
        renderItem={renderPedido}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    padding: SPACING.space_18,
  },
  title: {
    fontSize: FONTSIZE.size_14,
    marginBottom: SPACING.space_12,
    color: COLORS.gray
  },
  list: {
    paddingBottom: SPACING.space_18,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_18,
    marginBottom: SPACING.space_12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  proveedor: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
  },
  fechaPedido: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.gray,
    marginVertical: SPACING.space_10,
  },
  estado: {
    fontSize: FONTSIZE.size_14,
    fontWeight: 'bold',
  },
});
