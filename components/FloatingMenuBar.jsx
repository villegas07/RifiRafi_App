import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

export default function FloatingMenuBar({ menuItems }) {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedItem, setSelectedItem] = useState(route.name);

    // Actualiza el ítem seleccionado cuando cambia la pantalla activa
    useFocusEffect(
        useCallback(() => {
            setSelectedItem(route.name);
        }, [route.name])
    );

    if (!menuItems || menuItems.length === 0) {
        console.error('menuItems no está definido o está vacío');
        return null;
    }

    return (
        <View style={styles.menuContainer}>
            <View style={styles.menu}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate(item.screen)}
                        style={[
                            styles.button,
                            selectedItem === item.screen && styles.selectedButton,
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
        bottom: 10,
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