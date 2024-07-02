import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../../styles/gstyles';
import CardButton from '../../components/CardButton';

export default function EmpresaHomeScreen({ navigation }) {

  const data = [
    { title: 'Pedidos', icon: require('../../../assets/icons/icon_pedidos.png'), onPress: () => navigation.navigate('Pedidos') },
    { title: 'Inventario', icon: require('../../../assets/icons/icon_material.png'), onPress: () => navigation.navigate('Material') },
    { title: 'Trabajadores', icon: require('../../../assets/icons/icon_proveedores.png'), onPress: () => navigation.navigate('Supplier') },
  ];

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen</Text>

      <View style={styles.viewFlex}>
        <View style={styles.card}>
          <Text style={styles.titleCard}>Ventas del mes</Text>
          <Text style={styles.textTotalVentas}>S/. 0.00</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.titleCard}>Gastos del mes</Text>
          <Text style={styles.textTotalGastos}>S/. 0.00</Text>
        </View>
      </View>

      <FlatList
        style={styles.flatList}
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <CardButton title={item.title} icon={item.icon} onPress={item.onPress} />
        )}
      />

      <Text style={styles.title}>Pedidos realizados</Text>

      <Text style={styles.title}>Quemas en curso</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    width: '100%',
    padding: SPACING.space_18
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONTSIZE.size_12,
    marginBottom: SPACING.space_10
  },
  viewFlex: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: SPACING.space_10
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.space_12,
    paddingVertical: SPACING.space_16,
    flexBasis: "50%",
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center'
    // width: '100%'
  },
  titleCard: {
    color: COLORS.black,
  },
  textTotalVentas: {
    color: COLORS.green,
    fontSize: FONTSIZE.size_20,
    fontWeight: '900'
  },
  textTotalGastos: {
 color: COLORS.orange,
    fontSize: FONTSIZE.size_20,
    fontWeight: '900'
  },

  flatList: {
    flexGrow: 0,
    alignSelf: 'center'
  }
});
