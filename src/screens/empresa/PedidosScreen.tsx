import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonDarken from '../../components/ButtonDarken'
import { useNavigation } from '@react-navigation/native'
import { COLORS, FONTSIZE } from '../../styles/gstyles'

const PedidosScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ButtonDarken
        title={'Realizar Pedido'}
        onPress={() => navigation.navigate("DetallePedido")}
      />
      <Text style={styles.listTitle}>Pedidos realizados</Text>
    </View>
  )
}

export default PedidosScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.gray2,
  },
  listtitle:{
    marginTop: 20,
    fontSize: FONTSIZE.size_16,
    // fontWeight: 'bold',
    color: COLORS.gray
  }
})