import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FloatingMenuBar({ menuItems }) {
    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState('Home');

    // Verifica si menuItems no está definido o está vacío
    if (!menuItems || menuItems.length === 0) {
        console.error('menuItems no está definido o está vacío');
        return null; // Evita renderizar si no hay elementos
    }

    return (
        <View style={styles.menuContainer}>
            <View style={styles.menu}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setSelectedItem(item.screen); // Actualiza el estado al presionar
                            navigation.navigate(item.screen); // Navega a la pantalla correspondiente
                        }}
                        style={[
                            styles.button,
                            selectedItem === item.screen && styles.selectedButton, // Aplica el estilo si está seleccionado
                        ]}
                    >
                        {item.iconType === 'image' ? (
                            <Image
                                source={item.icon}
                                style={[
                                    styles.iconImage,
                                    selectedItem === item.screen && styles.selectedIconImage,
                                ]}
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name={item.icon}
                                size={32}
                                color={selectedItem === item.screen ? item.color : '#BDBDBD'}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
    menu: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 40,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    button: {
        padding: 2,
        marginHorizontal: 8,
        borderRadius: 20,
    },
    selectedButton: {
        backgroundColor: '#EEEEEE',
        elevation: 3,
    },
    iconImage: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
    },
    selectedIconImage: {
        tintColor: '#4CAF50',
    },
});