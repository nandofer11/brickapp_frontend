import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../../styles/gstyles';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../contexts/AuthContext';
// Para formatear las fechas
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonDarken from '../../components/ButtonDarken';
import { Picker } from '@react-native-picker/picker';

export default function DetallePedidoScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const [fechaPedido, setFechaPedido] = useState(new Date());
    const [fechaEntrega, setFechaEntrega] = useState(new Date());
    const [materialBusqueda, setMaterialBusqueda] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [cantidad, setCantidad] = useState('');
    const [resultados, setResultados] = useState([]);

    // Estados para el Picker forma de pago
    const [formaPago, setFormaPago] = useState(null);

    const onChangeFechaPedido = (event, selectedDate) => {
        const currentDate = selectedDate || fechaPedido;
        setFechaPedido(currentDate);
    };

    const onChangeFechaEntrega = (event, selectedDate) => {
        const currentDate = selectedDate || fechaEntrega;
        setFechaEntrega(currentDate);
    };

    const showDatepicker = (mode, setDate) => {
        DateTimePickerAndroid.open({
            value: mode === 'date' ? fechaPedido : fechaEntrega,
            onChange: (event, selectedDate) => {
                if (mode === 'date') {
                    setDate(selectedDate);
                }
            },
            mode: 'date',
            is24Hour: true,
        });
    };

    const buscarMateriales = async () => {
        try {
            const response = await api.get(`/materiales/nombre?nombre=${materialBusqueda}`);
            setResultados(response.data);
        } catch (error) {
            console.error('Error al buscar materiales:', error);
        }
    };

    const handleSelectMaterial = (material) => {
        setSelectedMaterial(material);
        setModalVisible(true);
    };

    const handleSolicitar = async () => {
        if (!cantidad || !formaPago) {
            Alert.alert('Error', 'Debe ingresar una cantidad y seleccionar la forma de pago.');
            return;
        }

        const pedidoData = {
            fecha_pedido: fechaPedido.toISOString().split('T')[0],
            fecha_entrega: fechaEntrega.toISOString().split('T')[0],
            estado: 'pendiente',
            Usuario_id_usuario: user.id,
            Proveedor_id_proveedor: selectedMaterial.Proveedor.id_proveedor,
            Material_id_material: selectedMaterial.id_material,
            cantidad: parseFloat(cantidad),
            forma_pago: formaPago,
        };

        console.log(pedidoData); // Verificar los datos del pedido

        try {
            await api.post('/pedido', pedidoData);
            Alert.alert('Éxito', 'Pedido registrado con éxito');
            setModalVisible(false);
            navigation.navigate('Pedidos');
        } catch (error) {
            console.error('Error al registrar el pedido:', error);
            Alert.alert('Error', 'Error al registrar el pedido.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Text style={styles.title}>Indique el material requerido</Text>
                <View style={styles.formFlex}>
                    <Text>Fecha de pedido: </Text>
                    <TextInput
                        placeholder='fecha pedido'
                        style={styles.formDateInput}
                        value={format(fechaPedido, "d 'de' MMMM yyyy", { locale: es })}
                        onFocus={() => showDatepicker('date', setFechaPedido)}
                    />
                </View>
                <View style={styles.formFlex}>
                    <Text>Fecha de entrega: </Text>
                    <TextInput
                        placeholder='fecha entrega'
                        style={styles.formDateInput}
                        value={format(fechaEntrega, "d 'de' MMMM yyyy", { locale: es })}
                        onFocus={() => showDatepicker('date', setFechaEntrega)}
                    />
                </View>
                <Text style={{ marginBottom: SPACING.space_10 }}>Forma de pago:</Text>
                <View style={styles.wrapperPicker}>
                    <Picker
                        selectedValue={formaPago}
                        mode='dropdown'
                        style={styles.picker}
                        onValueChange={(itemValue) => setFormaPago(itemValue)}
                    >
                        <Picker.Item label="Seleccione la forma de pago" value={null} />
                        <Picker.Item label="Efectivo" value="efectivo" />
                        <Picker.Item label="Transferencia" value="transferencia" />
                    </Picker>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar material por nombre"
                    value={materialBusqueda}
                    onChangeText={setMaterialBusqueda}
                />
                <TouchableOpacity onPress={buscarMateriales} style={styles.searchButton}>
                    <Icon name="search" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            <Text style={{ marginBottom: SPACING.space_10 }}>Lista de proveedores disponibles</Text>

            <FlatList
                data={resultados}
                keyExtractor={(item) => item.id_material.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectMaterial(item)}>
                        <View style={styles.resultItem}>
                            <View>
                                <Text>{item.nombre}</Text>
                                <Text style={styles.resultItemTitle}>{item.Proveedor.razon_social}</Text>
                                <Text>RUC: {item.Proveedor.ruc}</Text>
                            </View>
                            <View>
                                <Text style={styles.resultItemPrice}>${item.precio_unitario}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {selectedMaterial && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalView}>
                        <Text>Proveedor: {selectedMaterial.Proveedor.razon_social}</Text>
                        <Text style={{ marginBottom: SPACING.space_18 }}>RUC: {selectedMaterial.Proveedor.ruc}</Text>
                        <Text style={styles.modalText}>{selectedMaterial.nombre}</Text>
                        <Text style={{ marginBottom: SPACING.space_18 }}>Precio Unitario: S/. {selectedMaterial.precio_unitario}</Text>
                        <TextInput
                            style={styles.inputPriceModal}
                            placeholder="Cantidad"
                            value={cantidad}
                            onChangeText={setCantidad}
                            keyboardType="numeric"
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <ButtonDarken title="Cancelar" onPress={() => setModalVisible(false)} />
                            <ButtonPrimary title="Solicitar" onPress={handleSolicitar} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray2,
        padding: SPACING.space_18,
    },
    cardContainer: {
        backgroundColor: COLORS.white,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
        marginBottom: SPACING.space_20
    },
    formFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.space_12
    },
    formDateInput: {
        padding: SPACING.space_8,
        backgroundColor: COLORS.gray2,
        borderRadius: BORDERRADIUS.radius_8,
        marginLeft: SPACING.space_8,
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        color: COLORS.black,
        fontSize: FONTSIZE.size_16,
        marginBottom: SPACING.space_10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.space_20,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: BORDERRADIUS.radius_8,
        padding: SPACING.space_10,
    },
    searchButton: {
        backgroundColor: COLORS.black,
        padding: SPACING.space_10,
        marginLeft: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_8,
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
    resultItem: {
        backgroundColor: COLORS.white,
        padding: SPACING.space_10,
        marginBottom: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    resultItemTitle: {
        fontWeight: 'bold',
        fontSize: FONTSIZE.size_16,
        marginBottom: SPACING.space_4,
    },
    resultItemPrice: {
        color: 'orange',
        fontSize: FONTSIZE.size_18,
        fontWeight: '900',
    },
    modalView: {
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: BORDERRADIUS.radius_20,
        padding: SPACING.space_30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: SPACING.space_15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: FONTSIZE.size_16,
    },
    inputPriceModal: {
        borderWidth: 1,
        borderRadius: BORDERRADIUS.radius_8,
        padding: SPACING.space_8,
        borderColor: COLORS.orange
    }
});
