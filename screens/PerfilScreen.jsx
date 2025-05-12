import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Backgrounfour from "../components/Backgrounfour"; // Componente del fondo

export default function UserProfileScreen() {
    const [profileImage, setProfileImage] = useState(
        require("../assets/Vacaciones.jpg")
    );
    const [userData, setUserData] = useState({
        name: "Brayan Villegas Corrales",
        age: "21",
        identification: "21",
        email: "brayanvillegas@rifirafi.com",
        phone: "30028654574",
    });

    const [originalData, setOriginalData] = useState({ ...userData });

    const handleImageChange = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage({ uri: result.assets[0].uri });
        } else {
            Alert.alert("Error", "No seleccionaste ninguna imagen.");
        }
    };

    const handleInputChange = (key, value) => {
        setUserData((prev) => ({ ...prev, [key]: value }));
    };

    const confirmChanges = (key) => {
        // Solo muestra la alerta si el valor actual del campo es diferente al original
        if (userData[key] !== originalData[key]) {
            Alert.alert(
                "Confirmar cambio",
                "¿Está seguro que desea guardar este cambio?",
                [
                    {
                        text: "Cancelar",
                        onPress: () => {
                            // Revertimos el valor al original
                            setUserData((prev) => ({
                                ...prev,
                                [key]: originalData[key],
                            }));
                        },
                        style: "cancel",
                    },
                    {
                        text: "Guardar",
                        onPress: () => {
                            // Actualizamos los valores originales
                            setOriginalData((prev) => ({
                                ...prev,
                                [key]: userData[key],
                            }));
                        },
                    },
                ]
            );
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Fondo estático */}
            <Backgrounfour />

            {/* Contenido que se ajusta con el teclado */}
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileContainer}>
                        <View style={styles.profileImageContainer}>
                            <Image source={profileImage} style={styles.profileImage} />
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={handleImageChange}
                            >
                                <Text style={styles.editButtonText}>✎</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoContainer}>
                            {/* Información del usuario */}
                            <Text style={styles.label}>Nombre de Usuario</Text>
                            <TextInput
                                style={styles.input}
                                value={userData.name}
                                onChangeText={(text) => handleInputChange("name", text)}
                                onEndEditing={() => confirmChanges("name")}
                            />

                            <Text style={styles.label}>Edad</Text>
                            <TextInput
                                style={styles.input}
                                value={userData.age}
                                onChangeText={(text) => {
                                    const numericText = text.replace(/[^0-9]/g, ""); 
                                    handleInputChange("age", numericText);
                                }}
                                onEndEditing={() => confirmChanges("age")}
                                keyboardType="numeric" 
                                placeholder="Ingresa tu edad"
                            />

                            <Text style={styles.label}>N° Identificación</Text>
                            <TextInput
                                style={styles.input}
                                value={userData.identification}
                                editable={false}
                            />

                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={userData.email}
                                onChangeText={(text) => handleInputChange("email", text)}
                                onEndEditing={() => confirmChanges("email")}
                            />

                            <Text style={styles.label}>Teléfono</Text>
                            <TextInput
                                style={styles.input}
                                value={userData.phone}
                                onChangeText={(text) => {
                                    const numericText = text.replace(/[^0-9]/g, "");
                                    handleInputChange("phone", numericText);
                                }}
                                onEndEditing={() => confirmChanges("phone")}
                                keyboardType="numeric"
                                placeholder="Ingresa tu número de teléfono"
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    profileContainer: {
        marginTop: 150,
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: "#FFF",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        alignItems: "center",
    },
    profileImageContainer: {
        position: "relative",
    },
    profileImage: {
        width: 170,
        height: 170,
        borderRadius: 100,
        marginBottom: -30,
        top: -100,
    },
    editButton: {
        position: "absolute",
        top: 1,
        bottom: 0,
        right: -10,
        backgroundColor: "#FFD700",
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#FFF",
    },
    editButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    infoContainer: {
        width: "100%",
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
        marginTop: 10,
    },
    input: {
        marginTop: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        backgroundColor: "#f8f8f8",
        fontSize: 16,
        color: "#333",
    },
});
