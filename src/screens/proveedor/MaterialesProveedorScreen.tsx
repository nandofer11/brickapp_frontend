import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../../styles/gstyles';
import ButtonDarken from '../../components/ButtonDarken';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

export default function MaterialesProveedorScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [materiales, setMateriales] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const response = await api.get(`/materiales/proveedor/${user.Proveedor_id_proveedor}`);
        setMateriales(response.data);
      } catch (error) {
        console.error('Error al obtener los materiales:', error);
      }
    };

    fetchMateriales();
  }, [user.Proveedor_id_proveedor, isFocused]);

  const openMenu = (material) => {
    setSelectedMaterial(material);
    setMenuVisible(true);
  };

  const closeMenu = () => setMenuVisible(false);

  const handleEdit = () => {
    navigation.navigate('EditarMaterial', { material: selectedMaterial });
    closeMenu();
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/materiales/${selectedMaterial.id_material}`);
      setMateriales(materiales.filter((item) => item.id_material !== selectedMaterial.id_material));
      Alert.alert('Éxito', 'Material eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el material:', error);
      Alert.alert('Error', 'Error al eliminar el material');
    }
    closeMenu();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardSubtitle}>Peso: {item.peso} kg.</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.cardPrice}>S/. {item.precio_unitario}</Text>
        <Menu
          visible={menuVisible && selectedMaterial?.id_material === item.id_material}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="dots-horizontal"
              size={18}
              onPress={() => openMenu(item)}
            />
          }
        >
          <Menu.Item onPress={handleEdit} title="Editar" />
          <Divider />
          <Menu.Item onPress={handleDelete} title="Eliminar" />
        </Menu>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ButtonDarken
        title="Registrar Material"
        onPress={() => navigation.navigate('RegistrarMaterial')}
      />
      <Text style={styles.listTitle}>Listado de materiales</Text>

      {/* Lista de materiales en card */}
      <FlatList
        data={materiales}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_material.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <View style={{ flexDirection: 'row', gap: 20, alignSelf: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <FontAwesome6 name={'square-share-nodes'} size={32} color={COLORS.black} />
          <Text>Compartir</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
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
    padding: 20,
    backgroundColor: COLORS.gray2,
  },
  listTitle: {
    marginTop: 20,
    fontSize: FONTSIZE.size_16,
    // fontWeight: 'bold',
    color: COLORS.gray
  },
  listContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_10,
    marginBottom: SPACING.space_10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // position: 'relative'
  },
  cardTitle: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    marginBottom: SPACING.space_4,
    color: COLORS.black
  },
  cardSubtitle: {
    fontSize: FONTSIZE.size_14,
    marginBottom: SPACING.space_4,
    color: COLORS.gray
  },
  cardPrice: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: COLORS.orange,
    // position: 'absolute',
    // right: 20,
    // top: 20,
  }
});
