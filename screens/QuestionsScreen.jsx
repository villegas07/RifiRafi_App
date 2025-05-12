import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import SvgComponent from "../components/SvgComponent"; // Componente SVG del fondo detrás de la imagen
import PointsBar from "../components/PointsBar"; // Nuevo componente de barra de puntos

// Datos de ejemplo para las preguntas
const questions = [
    {
        question: "¿Cuál es la hamburguesa más famosa de McDonald's?",
        answers: ["McBacon", "Big Mac", "Doble Big Mac", "Mc Pollo"],
        correctAnswer: "Big Mac",
    },
    {
        question: "¿Cuál es el ingrediente principal de una pizza Margarita?",
        answers: ["Queso", "Tomate", "Albahaca", "Jamón"],
        correctAnswer: "Tomate",
    },
    // Más preguntas...
];

export default function QuestionsScreen({ navigation }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Índice de la pregunta actual
    const [userAnswers, setUserAnswers] = useState([]); // Respuestas del usuario
    const progressAnim = useRef(new Animated.Value(0)).current; // Animación de la barra
    const [timeSpent, setTimeSpent] = useState(0); // Tiempo que el usuario ha tardado en la pregunta actual
    const MAX_TIME = 15000; // Tiempo máximo por pregunta (15 segundos)

    // Función para manejar la selección de respuesta
    const handleAnswer = (answer) => {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = answer === currentQuestion.correctAnswer;

        // Guardar la respuesta del usuario
        setUserAnswers((prev) => [
            ...prev,
            {
                question: currentQuestion.question,
                userAnswer: answer,
                correctAnswer: currentQuestion.correctAnswer,
                timeSpent: timeSpent,
                isCorrect: isCorrect,
            },
        ]);

        // Avanzar a la siguiente pregunta o ir a la pantalla de resultados
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeSpent(0); // Reiniciar el tiempo para la siguiente pregunta
            progressAnim.setValue(0); // Reiniciar la animación de la barra de progreso
        } else {
            // Guardar la última respuesta antes de navegar a ResultsScreen
            const updatedUserAnswers = [
                ...userAnswers,
                {
                    question: currentQuestion.question,
                    userAnswer: answer,
                    correctAnswer: currentQuestion.correctAnswer,
                    timeSpent: timeSpent,
                    isCorrect: isCorrect,
                },
            ];

            // Navegar a la pantalla de resultados con todas las respuestas
            navigation.navigate("ResultsScreen", { results: updatedUserAnswers });
        }
    };

    // Efecto para el temporizador de la pregunta actual
    useEffect(() => {
        const startTime = Date.now(); // Tiempo inicial
        const timer = setInterval(() => {
            const elapsedTime = Date.now() - startTime; // Tiempo transcurrido en milisegundos
            setTimeSpent(elapsedTime);

            // Actualizar la animación de la barra de progreso
            progressAnim.setValue(elapsedTime / MAX_TIME);

            // Si el tiempo se agota, avanzar a la siguiente pregunta o ir a ResultsScreen
            if (elapsedTime >= MAX_TIME) {
                clearInterval(timer); // Detener el temporizador

                // Guardar la respuesta como "no respondida"
                setUserAnswers((prev) => [
                    ...prev,
                    {
                        question: questions[currentQuestionIndex].question,
                        userAnswer: "No respondida",
                        correctAnswer: questions[currentQuestionIndex].correctAnswer,
                        timeSpent: MAX_TIME,
                        isCorrect: false,
                    },
                ]);

                // Avanzar a la siguiente pregunta o ir a ResultsScreen
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setTimeSpent(0); // Reiniciar el tiempo para la siguiente pregunta
                    progressAnim.setValue(0); // Reiniciar la animación de la barra de progreso
                } else {
                    // Navegar a la pantalla de resultados
                    navigation.navigate("ResultsScreen", { results: userAnswers });
                }
            }
        }, 10); // Actualizar cada 10 milisegundos

        return () => clearInterval(timer); // Limpiar temporizador cuando el componente se desmonte
    }, [currentQuestionIndex]);

    // Ancho dinámico de la barra de progreso
    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    // Función para formatear el tiempo en HH:MM:SS:MS
    const formatTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / 3600000); // 1 hora = 3600000 ms
        const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 minuto = 60000 ms
        const seconds = Math.floor((milliseconds % 60000) / 1000); // 1 segundo = 1000 ms
        const ms = Math.floor(milliseconds % 1000); // Milisegundos restantes

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
    };

    // Obtener la pregunta actual
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            {/* Barra de puntos */}
            <View style={styles.scoreBar}>
                <Image source={require("../assets/logo0.png")} style={styles.logo} />
                <PointsBar onPress={() => navigation.navigate("PaymentScreen")} />
                <Image source={require("../assets/logo0.png")} style={styles.logo} />
            </View>

            {/* Barra de tiempo */}
            <View style={styles.timerBarContainer}>
                <Animated.View style={[styles.timerBar, { width: progressWidth }]} />
            </View>
            <Text style={styles.timerText}>{formatTime(timeSpent)}</Text>

            {/* Progreso de las preguntas */}
            <Text style={styles.progressText}>
                Pregunta {currentQuestionIndex + 1} de {questions.length}
            </Text>

            {/* Pregunta */}
            <View style={styles.questionContainer}>
                <View style={styles.svgWrapper}>
                    <SvgComponent style={styles.svgBackground} />
                    <Image
                        source={require("../assets/vacation.png")} // Imagen de la hamburguesa
                        style={styles.questionImage}
                    />
                </View>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>
            </View>

            {/* Botones de respuesta */}
            <View style={styles.buttonsContainer}>
                {currentQuestion.answers.map((answer, index) => (
                    <AnswerButton
                        key={index}
                        text={answer}
                        color={index % 2 === 0 ? "#4CAF50" : "#FFD700"} // Alternar colores
                        onPress={() => handleAnswer(answer)}
                    />
                ))}
            </View>
        </View>
    );
}

// Componente reutilizable para los botones de respuesta
const AnswerButton = ({ text, color, onPress }) => (
    <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={onPress}
    >
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scoreBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    timerBarContainer: {
        height: 10,
        backgroundColor: "#E0E0E0",
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 5,
        overflow: "hidden",
    },
    timerBar: {
        height: "100%",
        backgroundColor: "#4CAF50",
    },
    timerText: {
        textAlign: "center",
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    progressText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10,
    },
    questionContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    svgWrapper: {
        position: "relative",
        width: 200,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    svgBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    questionImage: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        top: 12,
    },
    questionText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginTop: 30,
        marginBottom: 30,
    },
    buttonsContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 10,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});