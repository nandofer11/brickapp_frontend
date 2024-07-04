import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SPACING, BORDERRADIUS } from '../../styles/gstyles';
import api from '../../services/api';
// Para formatear las fechas
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

export default function VerDetallePedidoScreen({ route }) {
  const { pedidoId } = route.params;
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await api.get(`/pedido/${pedidoId}`);
        setPedido(response.data);
      } catch (error) {
        console.error('Error al obtener el pedido:', error);
      }
    };

    fetchPedido();
  }, [pedidoId]);

  if (!pedido) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.nombreProveedor}>{pedido.Proveedor.razon_social}</Text>
        <Text style={styles.rucProveedor}>RUC: {pedido.Proveedor.ruc}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.space_16 }}>
          <View>
            <Text style={styles.fechaText}>Fecha de Pedido: </Text>
            <Text style={styles.fechaValue}>{format(pedido.fecha_pedido, "d 'de' MMMM yyyy", { locale: es })}</Text>
          </View>
          <View>
            <Text style={styles.fechaText}>Fecha de Entrega: </Text>
            <Text style={styles.fechaValue}>{format(pedido.fecha_entrega, "d 'de' MMMM yyyy", { locale: es })}</Text>
          </View>
        </View>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Forma de Pago:</Text>  {pedido.forma_pago}</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Estado:</Text>  {pedido.estado}</Text>
      </View>
      <Text style={styles.subtitle}>Detalle:</Text>
      {pedido.DetallePedidos.map((detalle) => (
        <View key={detalle.id_detalle_pedido} style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Material: </Text>
            <Text style={{ color: '#546DFD', fontWeight: 'bold' }}>{detalle.Material.nombre}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Cantidad: </Text>
            <Text style={{ color: '#546DFD', fontWeight: 'bold' }}>{detalle.cantidad}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Precio Unitario: S/.</Text>
            <Text style={{ color: '#546DFD', fontWeight: 'bold' }}>{detalle.Material.precio_unitario}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Subtotal: S/. </Text>
            <Text style={{ color: '#546DFD', fontWeight: 'bold' }}>{detalle.subtotal}</Text>
          </View>
        </View>
      ))}

      <View style={{ flexDirection: 'row', gap: 20, alignSelf: 'center'}}>
        <View style={{alignItems:'center'}}>
          <FontAwesome6 name={'square-share-nodes'} size={32} color={COLORS.black} />
          <Text>Compartir</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <FontAwesome6 name={'print'} size={32} color={COLORS.black} />
          <Text>Imprimir</Text>
        </View>
      </View>
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
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    marginBottom: SPACING.space_18,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    marginTop: SPACING.space_18,
    marginBottom: SPACING.space_18,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_18,
    marginBottom: SPACING.space_18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_4,
    color: COLORS.black
  },
  nombreProveedor: {
    color: COLORS.black,
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold'
  },
  rucProveedor: {
    color: COLORS.gray,
    marginBottom: SPACING.space_24
  },
  fechaText: {
    color: COLORS.black,
  },
  fechaValue: {
    color: '#546DFD',
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold'
  }
});
