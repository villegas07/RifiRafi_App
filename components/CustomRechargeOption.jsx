import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function CustomRechargeOption({ onChange }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value) => {
        // Convertir a número y validar la entrada
        const numericValue = value.replace(/[^0-9]/g, '');
        setInputValue(numericValue);
        onChange(numericValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Recargar un valor diferente</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.prefixText}>RF</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={inputValue}
                    onChangeText={handleInputChange}
                    placeholder="0"
                    placeholderTextColor="#999999"
                />
                <Text style={styles.equalsText}>=</Text>
                <Text style={styles.amountText}>
                    COP {(parseInt(inputValue || '0') * 200).toLocaleString()} {/* Asume 1 RF = 200 COP */}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        width: '90%',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    prefixText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        textAlign: 'center',
        fontSize: 16,
    },
    equalsText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    amountText: {
        fontSize: 16,
        color: '#555',
    },
});
