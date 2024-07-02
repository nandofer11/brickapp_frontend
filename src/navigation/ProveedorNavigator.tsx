import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProveedorHomeScreen from '../screens/proveedor/ProveedorHomeScreen';
import MaterialesProveedorScreen from '../screens/proveedor/MaterialesProveedorScreen.tsx';
import RegistrarMaterialScreen from '../screens/proveedor/RegistrarMaterialScreen';
import { COLORS } from '../styles/gstyles';

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
    </Stack.Navigator>
  );
}
