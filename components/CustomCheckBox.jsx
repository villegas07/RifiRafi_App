import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Asegúrate de que Expo esté configurado correctamente para esto.

const CustomCheckBox = ({ label, onToggle, checked, disabled }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handlePress = () => {
        if (!disabled) {
            const newState = !isChecked;
            setIsChecked(newState);
            onToggle(newState);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, disabled && styles.disabled]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && <AntDesign name="check" size={18} color="#fff" />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    checkbox: {
        height: 24,
        width: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        backgroundColor: "#fff",
    },
    checked: {
        backgroundColor: "#0FAC39",
        borderColor: "#0FAC39",
    },
    label: {
        fontSize: 16,
        color: "#333",
    },
    disabled: {
        opacity: 0.6,
    },
});

export default CustomCheckBox;
