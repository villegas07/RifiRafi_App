import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { forgotPassword } from '../api/auth/forgot-password';
import Icon from '../assets/logo0.png';

export default function ForgotYourPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage('Por favor ingrese su correo electrónico');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await forgotPassword(email.trim());

      if (response.success) {
        Alert.alert(
          'Correo enviado',
          'Se ha enviado un enlace de recuperación a su correo electrónico',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        setErrorMessage(response.error || 'Error al enviar el correo');
      }
    } catch (error) {
      setErrorMessage('Error de red o servidor no disponible');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <SvgTop width={200} height={200} />
        <SvgBottom width={200} height={200} />
      </View>

      <View style={styles.contentContainer}>
        <Image source={Icon} style={styles.icon} />
        <Text style={styles.title}>Recuperar Contraseña</Text>
        <Text style={styles.subtitle}>
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
        </Text>

        <TextInput
          placeholder="Correo Electrónico"
          placeholderTextColor="#999999"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          onPress={handleForgotPassword}
          disabled={isLoading}
          style={styles.button}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enviar</Text>
          )}
        </TouchableOpacity>

        <Text
          style={styles.backText}
          onPress={() => navigation.goBack()}
        >
          Volver al inicio de sesión
        </Text>
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
    backgroundColor: '#f1f1f1',
    position: 'relative',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  svgBottom: {
    position: 'absolute',
    bottom: -10,
    right: -60,
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#eae6e6',
    padding: 10,
    paddingStart: 20,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0FAC39',
    width: '80%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
    width: '100%',
  },
  backText: {
    fontSize: 14,
    color: '#5B5F64FF',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
