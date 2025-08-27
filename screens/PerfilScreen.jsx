import React, { useState, useEffect } from "react";
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
    ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Backgrounfour from "../components/Backgrounfour";
import Avatar from "../components/Avatar";
import { useUser } from "../hooks/useUser";

export default function UserProfileScreen() {
    const { user, loading, error, updateProfilePicture, updateUserData } = useUser();
    const [profileImage, setProfileImage] = useState(null);
    const [userData, setUserData] = useState({});
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        if (user) {
            const userInfo = {
                name: user.firstName || user.name || '',
                age: user.age?.toString() || '',
                identification: user.identification || '',
                email: user.email || '',
                phone: user.phone || '',
            };
            setUserData(userInfo);
            setOriginalData(userInfo);
            setProfileImage(user.picture ? { uri: user.picture } : null);
        }
    }, [user]);

    const handleImageChange = async () => {
        try {
            // Solicitar permisos
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos', 'Se necesitan permisos para acceder a la galería');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                console.log('Selected image URI:', imageUri);
                setProfileImage({ uri: imageUri });
                
                Alert.alert("Actualizando", "Subiendo imagen...");
                const updateResult = await updateProfilePicture(imageUri);
                console.log('Update result:', updateResult);
                
                if (updateResult.success) {
                    Alert.alert("Éxito", "Imagen actualizada correctamente");
                } else {
                    Alert.alert("Error", updateResult.error || "No se pudo actualizar la imagen de perfil");
                    setProfileImage(user.picture ? { uri: user.picture } : null);
                }
            }
        } catch (error) {
            console.error('Error in handleImageChange:', error);
            Alert.alert("Error", "Error al seleccionar la imagen");
        }
    };

    const handleInputChange = (key, value) => {
        setUserData((prev) => ({ ...prev, [key]: value }));
    };

    const confirmChanges = async (key) => {
        if (userData[key] !== originalData[key]) {
            Alert.alert(
                "Confirmar cambio",
                "¿Está seguro que desea guardar este cambio?",
                [
                    {
                        text: "Cancelar",
                        onPress: () => {
                            setUserData((prev) => ({
                                ...prev,
                                [key]: originalData[key],
                            }));
                        },
                        style: "cancel",
                    },
                    {
                        text: "Guardar",
                        onPress: async () => {
                            const updateData = {};
                            if (key === 'name') updateData.displayName = userData[key];
                            if (key === 'email') updateData.email = userData[key];
                            
                            const result = await updateUserData(updateData);
                            if (result.success) {
                                setOriginalData((prev) => ({
                                    ...prev,
                                    [key]: userData[key],
                                }));
                                Alert.alert("Éxito", "Datos actualizados correctamente");
                            } else {
                                Alert.alert("Error", "No se pudieron actualizar los datos");
                                setUserData((prev) => ({
                                    ...prev,
                                    [key]: originalData[key],
                                }));
                            }
                        },
                    },
                ]
            );
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <Backgrounfour />
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Cargando perfil...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.errorContainer]}>
                <Backgrounfour />
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Backgrounfour />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileContainer}>
                        <View style={styles.profileImageContainer}>
                            {profileImage ? (
                                <Image source={profileImage} style={styles.profileImage} />
                            ) : (
                                <View style={styles.profileImage}>
                                    <Avatar user={user} size={170} />
                                </View>
                            )}
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
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    errorContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 16,
        color: "#ff0000",
        textAlign: "center",
        marginHorizontal: 20,
    },
});
