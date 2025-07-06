import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function ButtonGradient() {
    const navigation = useNavigation(); 
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate('Home')}>
            <LinearGradient
                colors={['#2CC364FF', '#D5C620FF']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.button}>
        <Text style={styles.text}>Iniciar Sesión</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 200,
        marginTop: 15,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});