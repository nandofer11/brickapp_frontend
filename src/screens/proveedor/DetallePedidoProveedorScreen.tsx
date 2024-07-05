import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import api from '../../services/api';
import { COLORS, FONTSIZE, SPACING, BORDERRADIUS } from '../../styles/gstyles';
import { Picker } from '@react-native-picker/picker';
import ButtonPrimary from '../../components/ButtonPrimary';
// Para formatear las fechas
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DetallePedidoProveedorScreen({ route, navigation }) {
  const { pedido } = route.params;
  const [estado, setEstado] = useState(pedido.estado);

  // Mostrar el pedido en la consola al cargar el componente
  useEffect(() => {
    console.log('Pedido recibido:', pedido);
  }, []);

  const handleActualizarEstado = async () => {
    try {
      const updatedPedido = { ...pedido, estado }; // Crear objeto actualizado con el nuevo estado
      console.log("PedidoActualizado: ", updatedPedido);
      await api.put(`/pedido/${pedido.DetallePedidos[0].Pedido_id_pedido}`, updatedPedido); // Enviar la actualización al backend
      Alert.alert('Éxito', 'Estado del pedido actualizado con éxito');
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
      Alert.alert('Error', 'Error al actualizar el estado del pedido.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardDetalle}>
        <Text style={styles.title}>Detalle del Pedido</Text>
        <Text><Text style={styles.detailText}>Empresa:</Text>  {pedido.Usuario.Empresa.nombre_comercial}</Text>
        <Text><Text style={styles.detailText}>Fecha de Pedido:</Text>  {format(pedido.fecha_pedido, "d 'de' MMMM yyyy", { locale: es })}</Text>
        <Text><Text style={styles.detailText}>Fecha de Entrega:</Text>  {format(pedido.fecha_entrega, "d 'de' MMMM yyyy", { locale: es })}</Text>
        <Text><Text style={styles.detailText}>Forma de Pago:</Text>  {pedido.forma_pago}</Text>
        <Text><Text style={styles.detailText}>Subtotal: S/.</Text>  {pedido.DetallePedidos[0].subtotal}</Text>

        <Text style={styles.detailText}>Estado:</Text>
        <View style={styles.wrapperPicker}>
          <Picker
            selectedValue={estado}
            mode='dropdown'
            style={styles.picker}
            onValueChange={(itemValue) => setEstado(itemValue)}
          >
            <Picker.Item label="Pendiente" value="pendiente" />
            <Picker.Item label="Aceptado" value="aceptado" />
            <Picker.Item label="Cancelado" value="cancelado" />
            <Picker.Item label="Entregado" value="entregado" />
          </Picker>
        </View>

        <ButtonPrimary title="Actualizar Estado" onPress={handleActualizarEstado} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_20,
    backgroundColor: COLORS.gray2,
    justifyContent: 'center'
  },
  cardDetalle: {
    backgroundColor: COLORS.white,
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_8
  },
  title: {
    textAlign: 'center',
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    marginBottom: SPACING.space_16,
    color: COLORS.black
  },
  detailText: {
    fontWeight: 'bold',
    marginBottom: SPACING.space_12,
    color: COLORS.black
  },
  wrapperPicker: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: BORDERRADIUS.radius_10
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
