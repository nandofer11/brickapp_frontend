import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS, FONTSIZE, SPACING, BORDERRADIUS } from '../../styles/gstyles';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonPrimary from '../../components/ButtonPrimary';
import { Picker } from '@react-native-picker/picker';
// Para formatear las fechas
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const PedidosRoute = () => {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [estado, setEstado] = useState('');

  const fetchPedidos = async () => {
    try {
      const response = await api.get(`/pedido`, {
        params: {
          Proveedor_id_proveedor: user.Proveedor_id_proveedor,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          estado,
        },
      });
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultar Pedidos</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Buscar pedidos desde</Text>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
          <TextInput
            placeholder='Fecha Inicio'
            style={styles.input}
            value={format(startDate, "d 'de' MMMM yyyy", { locale: es })}
            editable={false}
          />
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowStartDatePicker(false);
              if (date) setStartDate(date);
            }}
          />
        )}
        <Text style={styles.label}>Hasta</Text>
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
          <TextInput
            placeholder='Fecha Fin'
            style={styles.input}
            value={format(endDate, "d 'de' MMMM yyyy", { locale: es })}
            editable={false}
          />
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowEndDatePicker(false);
              if (date) setEndDate(date);
            }}
          />
        )}
        <Text style={styles.label}>Estado</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={estado}
            onValueChange={(itemValue) => setEstado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Todos" value="" />
            <Picker.Item label="Pendiente" value="pendiente" />
            <Picker.Item label="Aceptado" value="aceptado" />
            <Picker.Item label="Cancelado" value="cancelado" />
            <Picker.Item label="Entregado" value="entregado" />
          </Picker>
        </View>
        <ButtonPrimary title="Buscar" onPress={fetchPedidos} />
      </View>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id_pedido.toString()}
        renderItem={({ item }) => (
          console.log(item),
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.Proveedor.razon_social}</Text>
            <Text style={styles.cardSubtitle}>Fecha de Pedido: {format(item.fecha_pedido, "d 'de' MMMM yyyy", { locale: es })}</Text>
            <Text style={styles.cardSubtitle}>Estado: {item.estado}</Text>
            <Text style={styles.cardPrice}>Subtotal: S/. {item.DetallePedidos.reduce((acc, detalle) => acc + detalle.subtotal, 0)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const SecondRoute = () => (
  <View style={styles.container}>
    <Text>Contenido de la segunda pestaña</Text>
  </View>
);

const ThirdRoute = () => (
  <View style={styles.container}>
    <Text>Contenido de la tercera pestaña</Text>
  </View>
);

export default function ReportesScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Pedidos' },
    { key: 'second', title: 'Tab 2' },
    { key: 'third', title: 'Tab 3' },
  ]);

  const renderScene = SceneMap({
    first: PedidosRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: '100%' }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: COLORS.orange }}
          style={{ backgroundColor: COLORS.white }}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color: focused ? COLORS.orange : COLORS.gray, fontWeight: 'bold' }}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_20,
    backgroundColor: COLORS.gray2,
  },
  title: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    marginBottom: SPACING.space_12,
    color: COLORS.black,
  },
  form: {
    marginBottom: SPACING.space_12,
  },
  label: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.black,
    marginBottom: SPACING.space_4,
  },
  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_8,
    padding: SPACING.space_10,
    marginBottom: SPACING.space_10,
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
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
    marginBottom: SPACING.space_10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: FONTSIZE.size_14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cardSubtitle: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.gray,
    marginTop: SPACING.space_4,
  },
  cardPrice: {
    fontSize: FONTSIZE.size_14,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginTop: SPACING.space_4,
  },
});
