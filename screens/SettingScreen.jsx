// screens/SettingScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Backgrounfour from '../components/Backgrounfour';


const SettingScreen = () => {
    return (
        <Backgrounfour>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    
                </View>
            </ScrollView>
        </Backgrounfour>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Asegura que el ScrollView ocupe todo el espacio disponible
        padding: 20,
    },
    section: {
        marginBottom: 20,
        width: '100%', // Asegura que los componentes ocupen todo el ancho disponible
    },
});

export default SettingScreen;