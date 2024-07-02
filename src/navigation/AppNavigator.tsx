import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import EmpresaNavigator from './EmpresaNavigator';
import ProveedorNavigator from './ProveedorNavigator';
import { AuthContext } from '../contexts/AuthContext';
import PedidosScreen from '../screens/empresa/PedidosScreen';
import DetallePedidoScreen from '../screens/empresa/DetallePedidoScreen';
import { COLORS } from '../styles/gstyles';


const Stack = createStackNavigator();

export default function AppNavigator() {
  const { signed, userType } = useContext(AuthContext);

  return (
    <Stack.Navigator 
      initialRouteName="Auth" 
      screenOptions={
        {headerStyle:{backgroundColor: COLORS.orange}, headerTintColor: COLORS.white, headerTitleAlign: 'center'
      }}>
      {!signed ? (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      ) : userType === 'empresa' ? (
        <>
        <Stack.Screen name="Empresa" component={EmpresaNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Pedidos" component={PedidosScreen}  />
        <Stack.Screen name="DetallePedido" component={DetallePedidoScreen}  options={{title: 'Detalle del pedido'}}/>
        </>
        
      ) : (
        <Stack.Screen name="Proveedor" component={ProveedorNavigator} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
