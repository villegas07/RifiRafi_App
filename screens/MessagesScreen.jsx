import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PuzzleBackground from "../components/BackgroundSecon";
import FloatingMenuBar from "../components/FloatingMenuBar";
import ProfileButton from "../components/ProfileButton";

const { width } = Dimensions.get("window");

const mockUsers = [
    { id: 1, name: "Brayan Villegas", image: require("../assets/Vacaciones.jpg"), online: true },
    { id: 2, name: "Daniela Pérez", image: require("../assets/Vacaciones.jpg"), online: false },
    { id: 3, name: "Luis Gómez", image: require("../assets/Vacaciones.jpg"), online: true },
    { id: 4, name: "Andrea Martínez", image: require("../assets/Vacaciones.jpg"), online: true },
    { id: 5, name: "Carlos López", image: require("../assets/Vacaciones.jpg"), online: false },
];

const menuItems = [
    { screen: "Ideas", icon: require("../assets/test.png"), iconType: "image", color: "#4CAF50" },
    { screen: "Messages", icon: require("../assets/chat.png"), iconType: "image", color: "#FFC107" },
    { screen: "Home", icon: require("../assets/home.png"), iconType: "image", color: "#03A9F4" },
    { screen: "Brain", icon: require("../assets/gym.png"), iconType: "image", color: "#9C27B0" },
    { screen: "Favorites", icon: require("../assets/historia.png"), iconType: "image", color: "#E91E63" },
];

export default function MessagesScreen({ navigation }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hola, ¿cómo estás?", sent: true },
        { id: 2, text: "Bien, ¿y tú?", sent: false },
    ]);
    const [messageText, setMessageText] = useState("");

    const closeChat = () => {
        setSelectedUser(null);
    };

    const sendMessage = () => {
        if (messageText.trim()) {
            setMessages([...messages, { id: messages.length + 1, text: messageText, sent: true }]);
            setMessageText("");
        }
    };

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permiso denegado", "Se necesita permiso para acceder a la cámara.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.cancelled) {
            setMessages([...messages, { id: messages.length + 1, text: "📸 Foto enviada", sent: true }]);
        }
    };

    const openGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permiso denegado", "Se necesita permiso para acceder a la galería.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.cancelled) {
            setMessages([...messages, { id: messages.length + 1, text: "🖼️ Foto enviada", sent: true }]);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* Fondo */}
            <PuzzleBackground />

            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image source={require("../assets/chat.png")} style={styles.headerIcon} />
                        <Text style={styles.headerTitle}>Chat</Text>
                    </View>
                    <ProfileButton
                        imageSource={require("../assets/Vacaciones.jpg")}
                        onPress={() => navigation.navigate("UserProfileScreen")}
                        style={styles.profileButton}
                    />
                </View>
            </View>

            {/* Scroll de usuarios */}
            <View style={styles.usersContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.userScrollContainer}
                >
                    {mockUsers.map((user) => (
                        <TouchableOpacity
                            key={user.id}
                            style={styles.userContainer}
                            onPress={() => setSelectedUser(user)}
                        >
                            <Image source={user.image} style={styles.userImage} />
                            {user.online && <View style={styles.onlineIndicator} />}
                            <Text style={styles.userName}>{user.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Chat */}
            {selectedUser && (
                <View style={styles.chatContainer}>
                    {/* Header del chat */}
                    <View style={styles.chatHeader}>
                        <Image source={selectedUser.image} style={styles.chatUserImage} />
                        <Text style={styles.chatUserName}>{selectedUser.name}</Text>
                        <TouchableOpacity style={styles.callButton}>
                            <Text style={styles.callButtonText}>📞</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={closeChat}>
                            <Text style={styles.closeButtonText}>❌</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Mensajes */}
                    <ScrollView
                        style={styles.messagesContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {messages.map((msg) => (
                            <View
                                key={msg.id}
                                style={
                                    msg.sent ? styles.messageBubbleSent : styles.messageBubbleReceived
                                }
                            >
                                <Text style={styles.messageText}>{msg.text}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Campo de texto */}
                    <View style={styles.messageInputContainer}>
                        <TouchableOpacity onPress={openGallery} style={styles.iconButton}>
                            <Text style={styles.galleryIcon}>🖼️</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.messageInput}
                            placeholder="Escribe algo..."
                            value={messageText}
                            onChangeText={setMessageText}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
                            <Text style={styles.sendIcon}>➤</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openCamera} style={styles.iconButton}>
                            <Text style={styles.cameraIcon}>📷</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Menú flotante */}
            {!selectedUser && (
                <View style={styles.menuContainer}>
                    <FloatingMenuBar menuItems={menuItems} />
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 10,
        backgroundColor: "transparent",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 47,
        marginLeft: 110
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    profileButton: {
        width: 50,
        height: 50,
    },
    usersContainer: {
        position: "absolute",
        top: 120,
        width: "100%",
        height: 100,
        zIndex: 5,
        backgroundColor: "transparent",
    },
    userScrollContainer: {
        paddingVertical: 10,
        alignItems: "center",
    },
    userContainer: {
        alignItems: "center",
        marginHorizontal: 10,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    onlineIndicator: {
        position: "absolute",
        bottom: 70,
        right: 10,
        width: 10,
        left: 53,
        height: 10,
        backgroundColor: "green",
        borderRadius: 5,
    },
    userName: {
        marginTop: 5,
        fontSize: 12,
        textAlign: "center",
    },
    chatContainer: {
        flex: 1,
        marginTop: -20,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
    },
    chatHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    chatUserImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    chatUserName: {
        flex: 1,
        marginLeft: 10,
        fontWeight: "bold",
    },
    callButton: {
        backgroundColor: "#4CAF50",
        borderRadius: 20,
        padding: 10,
    },
    callButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    closeButton: {
        marginLeft: 10,
    },
    closeButtonText: {
        fontSize: 18,
        color: "red",
    },
    messagesContainer: {
        flex: 1,
    },
    messageBubbleSent: {
        alignSelf: "flex-end",
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: "70%",
    },
    messageBubbleReceived: {
        alignSelf: "flex-start",
        backgroundColor: "#CCC",
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: "70%",
    },
    messageText: {
        color: "#FFF",
    },
    messageInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#FFD700",
        borderRadius: 30,
        elevation: 3,
    },
    messageInput: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#EEE",
    },
    iconButton: {
        marginHorizontal: 5,
    },
    emojiIcon: {
        fontSize: 24,
    },
    sendIcon: {
        fontSize: 20,
        color: "#4CAF50",
    },
    voiceIcon: {
        fontSize: 20,
        color: "#03A9F4",
    },
    cameraIcon: {
        fontSize: 20,
        color: "#FFC107",
    },
    menuContainer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
    },
});
