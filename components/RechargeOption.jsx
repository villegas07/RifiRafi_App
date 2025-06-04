import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function RechargeOption({ points, amount, selected, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.optionContainer, selected && styles.selectedOption]}
            onPress={onPress}
        >
            <View style={styles.innerContainer}>
                <Image source={require('../assets/Monedero.png')} style={styles.coinIcon} />
                <Text style={styles.pointsText}>{points}</Text>
                <Text style={styles.amountText}>COP {amount.toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    optionContainer: {
        width: '30%',
        padding: 12,
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    selectedOption: {
        borderColor: '#0FAC39',
        borderWidth: 2,
    },
    innerContainer: {
        alignItems: 'center',
    },
    coinIcon: {
        width: 30,
        height: 30,
        marginBottom: 8,
    },
    pointsText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    amountText: {
        fontSize: 12,
        color: '#555',
    },
});
