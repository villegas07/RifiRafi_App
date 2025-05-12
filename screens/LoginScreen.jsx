import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import ButtonGradient from "../components/ButtonGradient"; // Ruta relativa al componente
import Icon from "../assets/logo0.png"; // Ruta relativa al ícono
import { Svg, Path } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false); // Estado para mostrar/ocultar contraseña

    const handleLoginWithGoogle = () => {
        alert("Inicio de sesión con Google no implementado");
    };

    const handleLoginWithFacebook = () => {
        alert("Inicio de sesión con Facebook no implementado");
    };

    const handleLoginWithApple = () => {
        alert("Inicio de sesión con Apple ID no implementado");
    };

    return (
        <View style={styles.container}>
            {/* Contenedor de fondo */}
            <View style={styles.backgroundContainer}>
                <SvgTop width={200} height={200} />
                <SvgBottom width={200} height={200} />
            </View>

            {/* Contenido principal */}
            <View style={styles.contentContainer}>
                <Image source={Icon} style={styles.icon} />
                <Text style={styles.subTitle}>Iniciar Sesión</Text>
                <TextInput placeholder="Email@email.com" style={styles.TexInput} />

                {/* TextInput de Contraseña con "ojito" */}
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Password"
                        style={styles.passwordInput}
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        style={styles.eyeIcon}
                    >
                        <AntDesign
                            name={passwordVisible ? "eye" : "eyeo"}
                            size={20}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>

                <Text
                    style={[styles.texto, { color: "#5B5F64FF" }]}
                    onPress={() => navigation.navigate("ForgotYourPasswordScreen")}
                >
                    ¿Olvidaste tu contraseña?
                </Text>
                <ButtonGradient />
                <Text
                    style={[styles.texto, { color: "#5B5F64FF" }]}
                    onPress={() => navigation.navigate("RegisterScreen")}
                >
                    No tengo una cuenta
                </Text>

                {/* Botones de inicio de sesión con otras plataformas */}
                <TouchableOpacity
                    style={[styles.socialButton, styles.facebookButton]}
                    onPress={handleLoginWithFacebook}
                >
                    <Image
                        source={require("../assets/facebook.png")}
                        style={styles.socialIcon}
                    />
                    <Text style={styles.socialButtonText}>Continue con Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.socialButton, styles.googleButton]}
                    onPress={handleLoginWithGoogle}
                >
                    <Image
                        source={require("../assets/google.png")}
                        style={styles.socialIcon}
                    />
                    <Text style={styles.socialButtonText}>Continue con Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.socialButton, styles.appleButton]}
                    onPress={handleLoginWithApple}
                >
                    <Image
                        source={require("../assets/Apple.png")}
                        style={styles.socialIcon}
                    />
                    <Text style={styles.socialButtonText}>Continue con Apple</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function SvgTop({ width = 200, height = 200 }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={width}
            height={height}
            viewBox="0 0 246 246"
        >
            <Path
                fill="#0FAC39"
                stroke="#0FAC39"
                d="M0 0v236.293c7.214 5.637 11.804 7.571 20.856 9.088 5.85.832 9.633.818 17.229 0 8.608-1.422 13.35-3.845 21.762-9.088 12.784-8.492 17.298-13.75 22.67-23.63 2.42-15.867 2.412-23.583 0-35.443-.864-5.42-1.868-9.014-4.534-16.359 0 0-.788-8.059 0-13.632 3.782-9.06 7.435-12.796 15.415-18.177 15.909-6.613 23.477-6.061 35.365 0 5.409 4.725 7.082 8.609 8.161 17.268 1.353 8.286 3.28 11.543 9.068 14.541 10.438 3.773 15.942 3.376 25.389 0 9.099-5.167 13.532-8.919 20.856-16.359 13.485-12.69 18.116-24.855 21.763-54.529-2.55-20.143-7.644-26.898-21.763-32.717-6.697-1.935-11.201-2.02-20.856 0-11.171 3.945-16.22 6.462-21.762 11.814-4.586 4.053-8.623 3.94-18.136 0-10.51-10.753-14.415-18.029-17.229-33.626-.357-14.8 3.981-22.485 17.229-35.444H0Z"
            />
        </Svg>
    );
}

function SvgBottom({ width = 200, height = 200 }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={width}
            height={height}
            viewBox="0 0 246 246"
            style={styles.svgBottom}
        >
            <Path
                fill="gold"
                stroke="gold"
                d="M196 233V12.528c-7.614 8.428-12.386 12.504-22.524 17.675-9.257 3.725-15.019 4.65-28.399 0-21.869-13.762-34.736-20.14-59.737-26.978-13.97-2.84-21.346-3.09-33.296 0-7.54 2.489-11.977 4.842-20.565 12.093C10.741 36.901 4.747 51.767 6.018 84.158c.325 17.628 4.437 24.386 16.648 32.559 5.383 3.419 9.226 3.455 17.627 0 8.098-4.234 12.594-7.168 20.565-13.024 5.888-1.761 8.834-1.579 13.71 0 12.779 7.228 17.04 12.742 19.586 25.118 1.505 14.531 1.657 22.678 0 37.21-1.442 10.796-4.791 15.623-16.648 21.396-5.081 1.777-8.522 2.033-16.648 0-11.496-9.17-17.926-12.836-29.379-17.675-7.525-1.22-11.2-1.432-15.669 0-8.846 4.986-11.702 8.28-13.71 14.884-1.443 5.856-1.49 9.881 0 18.606C6.626 214.388 8.313 220.915 9.935 233H196Z"
            />
        </Svg>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        position: "relative",
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    contentContainer: {
        flex: 1,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    svgBottom: {
        position: "absolute",
        bottom: -10,
        right: -60,
    },
    icon: {
        width: 230,
        height: 230,
        resizeMode: "contain",
        marginBottom: -30,
    },
    subTitle: {
        fontSize: 20,
        color: "gray",
    },
    TexInput: {
        borderWidth: 1,
        borderColor: "#eae6e6",
        padding: 10,
        paddingStart: 30,
        width: "80%",
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: "white",
    },
    texto: {
        fontSize: 14,
        color: "grey",
        marginTop: 8,
    },
    socialButton: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start", // Asegura que los íconos y texto se alineen correctamente
        paddingVertical: 12,
        borderRadius: 30,
        marginTop: 15,
        paddingLeft: 15, // Añade espacio para que el contenido no quede pegado al borde
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    facebookButton: {
        backgroundColor: "#1877F2",
    },
    googleButton: {
        backgroundColor: "#FB5344FF",
    },
    appleButton: {
        backgroundColor: "black",
    },
    socialButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 20, // Separa el texto del ícono
    },
    socialIcon: {
        width: 22,
        height: 22,
        marginRight: 10, // Espaciado entre el ícono y el texto
    },
    passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eae6e6",
    borderRadius: 25,
    backgroundColor: "white",
    paddingHorizontal: 15,
    marginTop: 20,
    width: "100%",
    height: 50,
},
passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eae6e6",
    borderRadius: 25,
    backgroundColor: "white",
    paddingHorizontal: 15,
    marginTop: 20,
    width: "80%",
    height: 50,
},
passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
},
eyeIcon: {
    marginLeft: 10,
},

});

