import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CustomDropdown({ data, placeholder, onSelect }) {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelect = (item) => {
        setSelectedValue(item.label);
        setIsVisible(false);
        if (typeof onSelect === "function") {
            onSelect(item); // Notifica al padre sobre el cambio si `onSelect` está definido
        }
    };

    return (
        <View style={styles.container}>
            {/* Botón para abrir/cerrar el dropdown */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => setIsVisible(!isVisible)}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>
                    {selectedValue || placeholder || "Selecciona una opción"}
                </Text>
                <AntDesign
                    name={isVisible ? "up" : "down"}
                    size={16}
                    color="#333"
                />
            </TouchableOpacity>

            {/* Modal para las opciones */}
            {isVisible && (
                <Modal
                    visible={isVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setIsVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setIsVisible(false)}
                    >
                        <View style={styles.dropdown}>
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.option}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text style={styles.optionText}>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                                contentContainerStyle={styles.optionContainer}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        top: 15,
    },
    button: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#eae6e6",
    },
    buttonText: {
        fontSize: 14,
        color: "#333",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    dropdown: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        maxHeight: 250,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    optionText: {
        fontSize: 14,
        color: "#333",
    },
    optionContainer: {
        paddingBottom: 10,
    },
});
