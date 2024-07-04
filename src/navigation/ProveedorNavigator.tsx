import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProveedorHomeScreen from '../screens/proveedor/ProveedorHomeScreen';
import MaterialesProveedorScreen from '../screens/proveedor/MaterialesProveedorScreen';
import RegistrarMaterialScreen from '../screens/proveedor/RegistrarMaterialScreen';
import { COLORS } from '../styles/gstyles';
import EditarMaterialScreen from '../screens/empresa/EditarMaterialScreen';
import PedidosProveedorScreen from '../screens/proveedor/PedidosProveedorScreen';
import DetallePedidoProveedorScreen from '../screens/proveedor/DetallePedidoProveedorScreen';

const Stack = createStackNavigator();

export default function ProveedorNavigator() {
  return (
    <Stack.Navigator initialRouteName="ProveedorHome" screenOptions={{ headerShown: true , headerTitleAlign:'center'}}>
      <Stack.Screen name="ProveedorHome" component={ProveedorHomeScreen} options={{headerShown: false}}/>
      <Stack.Screen 
        name="MaterialesProveedor" 
        component={MaterialesProveedorScreen} 
        options={
          {title: 'Materiales',
            headerStyle: {
              // backgroundColor: '#f4511e',
            },
            headerTintColor: COLORS.black,
            // headerTransparent: true,
          }
        }
      />
      <Stack.Screen name="RegistrarMaterial" component={RegistrarMaterialScreen} options={{title: 'Registrar Material'}}/>
      <Stack.Screen name="EditarMaterial" component={EditarMaterialScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PedidosProveedor" component={PedidosProveedorScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DetallePedidoProveedor" component={DetallePedidoProveedorScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
