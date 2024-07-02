import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import LoginEmpresaScreen from '../screens/auth/LoginEmpresaScreen';
import LoginProveedorScreen from '../screens/auth/LoginProveedorScreen';
import SelectTypeRegisterScreen from '../screens/auth/SelectTypeRegisterScreen';
import RegisterEmpresaScreen from '../screens/empresa/RegisterEmpresaScreen';
import RegisterProveedorScreen from '../screens/proveedor/RegisterProveedorScreen';
import CreateUsuarioEmpresaScreen from '../screens/empresa/CreateUsuarioEmpresaScreen';
import CreateUsuarioProveedorScreen from '../screens/proveedor/CreateUsuarioProveedorScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginEmpresa" component={LoginEmpresaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginProveedor" component={LoginProveedorScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="LoginProveedor" component={LoginProveedorScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen name="SelectTypeRegister" component={SelectTypeRegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterEmpresa" component={RegisterEmpresaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterProveedor" component={RegisterProveedorScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateUsuarioEmpresa" component={CreateUsuarioEmpresaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateUsuarioProveedor" component={CreateUsuarioProveedorScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
