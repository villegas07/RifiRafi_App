import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Backgrounfour from "../components/Backgrounfour";
import Avatar from "../components/Avatar";
import { useUser } from "../hooks/useUser";


const buttonOptions = [
    { label: "Perfil", screen: "PerfilScreen", icon: require("../assets/perfil.png") },
    { label: "QR", screen: "QRScreen", icon: require("../assets/QR.png") },
    { label: "Monedero", screen: "PaymentScreen", icon: require("../assets/Monedero.png") },
    { label: "Seguridad", screen: "SecurityScreen", icon: require("../assets/Seguridad.png") },
    { label: "Salir", screen: "LoginScreen", icon: require("../assets/Salir.png") },
];

export default function PerfilScreen({ navigation }) {
    const { user, loading, error, updateProfilePicture } = useUser();
    const [profileImage, setProfileImage] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (user) {
            setProfileImage(user.picture ? { uri: user.picture } : require("../assets/Vacaciones.jpg"));
            setUserName(user.name || 'Usuario');
        }
    }, [user]);

    const changeProfilePicture = async () => {
        try {
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
                setProfileImage({ uri: imageUri });
                
                Alert.alert("Actualizando", "Subiendo imagen...");
                const updateResult = await updateProfilePicture(imageUri);
                
                if (updateResult.success) {
                    Alert.alert("Éxito", "Imagen actualizada correctamente");
                } else {
                    Alert.alert("Error", updateResult.error || "No se pudo actualizar la imagen de perfil");
                    setProfileImage(user.picture ? { uri: user.picture } : null);
                }
            }
        } catch (error) {
            console.error('Error changing profile picture:', error);
            Alert.alert("Error", "Error al cambiar la imagen de perfil");
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
        <View style={styles.container}>
            <Backgrounfour />
            <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                    {profileImage ? (
                        <Image source={profileImage} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileImage}>
                            <Avatar user={user} size={130} />
                        </View>
                    )}
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={changeProfilePicture}
                    >
                        <Text style={styles.editButtonText}>✎</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>{user?.firstName || user?.name || 'Usuario'}</Text>
                <View style={styles.buttonsContainer}>
                    {buttonOptions.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionButton}
                            onPress={() => navigation.navigate(item.screen)}
                        >
                            <Image source={item.icon} style={styles.optionIcon} />
                            <Text style={styles.optionButtonText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#F1F1F1",
    },
    profileContainer: {
        marginTop: 230,
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
        width: 130,
        height: 130,
        borderRadius: 80,
        top : -85,
    },
    editButton: {
        position: "absolute",
        bottom: 100,
        right: -5,
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
    buttonsContainer: {
        marginTop: -40,
        width: "100%",
    },
    optionButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    optionIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    optionButtonText: {
        fontSize: 18,
        color: "#333",
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginTop: -30,
        marginBottom: 20,
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
