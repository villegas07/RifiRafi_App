// RegisterScreen.jsx (completo)
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonGradient from "../components/ButtonGradient";
import CustomDropdown from "../components/CustomDropdown";
import Icon from "../assets/logo0.png";
import CustomCheckBox from "../components/CustomCheckBox";
import PolicyModal from "../components/PolicyModal";
import { Svg, Path } from "react-native-svg";
import { register } from "../api/auth/register"; // Importamos el servicio

export default function RegisterScreen({ navigation }) {
  // Estados para campos del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // Estados para UI y control
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);

  // Estados para fecha y dropdowns
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Argentina");
  const [selectedDocumentType, setSelectedDocumentType] = useState("CC");

  // Estados para contraseña
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Validación de coincidencia de contraseñas
  const isPasswordMatch = password === confirmPassword;

  // Opciones para dropdowns (igual que antes)
  const countries = [
    "Argentina", "Bolivia", "Brasil", "Chile", "Colombia",
    "Costa Rica", "Cuba", "Ecuador", "El Salvador", "Guatemala",
    "Honduras", "México", "Nicaragua", "Panamá", "Paraguay",
    "Perú", "República Dominicana", "Uruguay", "Venezuela"
  ].map((country) => ({ label: country, value: country }));

  const documentTypes = [
    { label: "Cédula de Ciudadanía", value: "CC" },
    { label: "Cédula de Extranjería", value: "CE" },
    { label: "Pasaporte", value: "Pasaporte" },
  ];

  // Función para manejar el registro (MODIFICADA)
  const handleSubmit = async () => {
    // Validaciones básicas (igual que antes)
    if (!firstName || !lastName || !username || !email || !password) {
      setErrorMessage("Por favor complete todos los campos obligatorios");
      return;
    }

    if (!isPasswordMatch) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    if (!isPolicyChecked) {
      setErrorMessage("Debe aceptar las políticas de la app");
      return;
    }

    if (!selectedCountry || !selectedDocumentType) {
      setErrorMessage("Seleccione país y tipo de documento");
      return;
    }

    // Preparar datos para la API
    const apiData = {
      username,
      displayName,
      firstName,
      lastName,
      country: selectedCountry,
      dniType: selectedDocumentType,
      dniNumber: documentNumber,
      phoneNumber,
      email,
      password,
    };

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Usamos la función importada de la API
      const response = await register(apiData);
      
      if (response.success) {
        Alert.alert(
          "Registro exitoso", 
          "Tu cuenta ha sido creada correctamente",
          [{ text: "OK", onPress: () => navigation.navigate("Login") }]
        );
      } else {
        setErrorMessage(response.error || "Error en el registro");
      }
    } catch (error) {
      setErrorMessage("Error de red o servidor no disponible");
    } finally {
      setIsLoading(false);
    }
  };

  // Resto del código del componente (igual que antes)
  return (
    <View style={styles.container}>
      {/* Contenedor de fondo */}
      <View style={styles.backgroundContainer}>
        <SvgTop width={200} height={200} />
        <SvgBottom width={200} height={200} />
      </View>

      {/* Contenido principal en ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={Icon} style={styles.icon} />
        <Text style={styles.subTitle}>Regístrate</Text>

        {/* Mensaje de error */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Campos del formulario (igual que antes) */}
        <TextInput
          placeholder="Nombres"
          style={styles.TexInput}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Apellidos"
          style={styles.TexInput}
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Fecha de Nacimiento (igual que antes) */}
        <View style={styles.dateRow}>
          <Text style={styles.label}>Fecha de Nacimiento:</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{birthDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setBirthDate(selectedDate);
            }}
            maximumDate={new Date()}
          />
        )}

        {/* País de Origen */}
        <CustomDropdown
          data={countries}
          placeholder="País de Origen"
          onChange={(item) => setSelectedCountry(item.value || item.label)}
          value={selectedCountry}
        />

        {/* Tipo de Documento */}
        <CustomDropdown
          data={documentTypes}
          placeholder="Tipo de Documento"
          onChange={(item) => setSelectedDocumentType(item.value || item.label)}
          value={selectedDocumentType}
        />

        <TextInput
          placeholder="N° Documento"
          style={styles.TexInput}
          keyboardType="numeric"
          value={documentNumber}
          onChangeText={setDocumentNumber}
        />
        <TextInput
          placeholder="Teléfono"
          style={styles.TexInput}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Correo Electrónico"
          style={styles.TexInput}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Nombre de Usuario"
          style={styles.TexInput}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Nombre a mostrar"
          style={styles.TexInput}
          value={displayName}
          onChangeText={setDisplayName}
        />

        {/* Contraseña (igual que antes) */}
        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            placeholder="Contraseña"
            style={[
              styles.TexInput,
              password && !isPasswordMatch && { borderColor: "red" },
            ]}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <AntDesign
              name={passwordVisible ? "eye" : "eyeo"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Confirmar Contraseña (igual que antes) */}
        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            placeholder="Confirmar Contraseña"
            style={[
              styles.TexInput,
              confirmPassword && !isPasswordMatch && { borderColor: "red" },
            ]}
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <AntDesign
              name={confirmPasswordVisible ? "eye" : "eyeo"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <CustomCheckBox
          label={
            <Text>
              Estoy de acuerdo con las{" "}
              <Text
                style={styles.link}
                onPress={() => setIsPolicyModalVisible(true)}
              >
                políticas de la app
              </Text>
            </Text>
          }
          checked={isPolicyChecked}
          onToggle={(isChecked) => setIsPolicyChecked(isChecked)}
        />

        <PolicyModal
          visible={isPolicyModalVisible}
          onClose={() => setIsPolicyModalVisible(false)}
          onAccept={() => {
            setIsPolicyChecked(true);
            setIsPolicyModalVisible(false);
          }}
        />

        {/* Botón de registro con loading state (igual que antes) */}
        <TouchableOpacity
          style={[
            styles.registerButton,
            {
              backgroundColor: isPolicyChecked ? "#0FAC39" : "#ccc",
              opacity: isLoading ? 0.7 : 1
            },
          ]}
          disabled={!isPolicyChecked || isLoading}
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerButtonText}>Terminar Registro</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Componentes Svg y estilos (sin cambios)
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        alignItems: "center",
    },
    contentContainer: {
        zIndex: 1,
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
        marginBottom: 20,
    },
    TexInput: {
        borderWidth: 1,
        borderColor: "#eae6e6",
        padding: 10,
        width: "100%",
        height: 50,
        marginTop: 20,
        borderRadius: 25,
        backgroundColor: "white",
        paddingStart: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
    dateInput: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: "#eae6e6",
        borderRadius: 25,
        backgroundColor: "white",
        justifyContent: "center",
        paddingHorizontal: 15,
        marginLeft: 10,
    },
    link: {
        color: "#0FAC39",
        textDecorationLine: "underline",
    },
    registerButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    registerButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    eyeButton: {
        position: "absolute",
        right: 20,
        top: 35,
        zIndex: 1,
    },
    errorText: {
        color: "red",
        marginVertical: 10,
        textAlign: "center",
        width: "100%",
    }
});