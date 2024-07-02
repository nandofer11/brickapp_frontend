import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EmpresaHomeScreen from '../screens/empresa/EmpresaHomeScreen';
import PerfilScreen from '../screens/empresa/PerfilScreen';

import DrawerContent from '../components/CustomDrawer';
import { COLORS } from '../styles/gstyles';

const Drawer = createDrawerNavigator();


export default function EmpresaNavigator() {
  return (
    <Drawer.Navigator 
    screenOptions={
      {headerStyle:{backgroundColor: COLORS.orange}, headerTintColor: COLORS.white, headerTitleAlign: 'center'
    }} 
    drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={EmpresaHomeScreen} options={{title: 'Administración'}}/>
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
    </Drawer.Navigator>
  );
}
