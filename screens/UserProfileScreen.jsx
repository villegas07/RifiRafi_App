import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Backgrounfour from "../components/Backgrounfour";
import FloatingMenuBar from "../components/FloatingMenuBar";


const buttonOptions = [
    { label: "Perfil", screen: "PerfilScreen", icon: require("../assets/perfil.png") },
    { label: "QR", screen: "QRScreen", icon: require("../assets/QR.png") },
    { label: "Monedero", screen: "PaymentScreen", icon: require("../assets/Monedero.png") },
    { label: "Seguridad", screen: "SecurityScreen", icon: require("../assets/Seguridad.png") },
    { label: "Ajustes", screen: "SettingScreen", icon: require("../assets/Ajustes.png") },
    { label: "Salir", screen: "LoginScreen", icon: require("../assets/Salir.png") },
];

export default function PerfilScreen({ navigation }) {
    const [profileImage, setProfileImage] = useState(require("../assets/Vacaciones.jpg"));

    const changeProfilePicture = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage({ uri: result.assets[0].uri });
        }
    };

    return (
        <View style={styles.container}>
            <Backgrounfour />

            {/* Contenedor del perfil */}
            <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                    <Image source={profileImage} style={styles.profileImage} />
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={changeProfilePicture}
                    >
                        <Text style={styles.editButtonText}>✎</Text>
                    </TouchableOpacity>
                </View>
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
    menuContainer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
    },
});
