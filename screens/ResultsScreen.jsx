import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Backgrounfour from '../components/Backgrounfour'; // Importa el componente de fondo

const ResultsScreen = ({ route }) => {
    // Obtener los resultados de las preguntas desde los parámetros de navegación
    const { results } = route.params;

    // Calcular los puntos totales y el tiempo total
    const totalPoints = results.filter((result) => result.isCorrect).length;
    const totalTime = results.reduce((sum, result) => sum + result.timeSpent, 0);

    // Función para formatear el tiempo en HH:MM:SS:MS
    const formatTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / 3600000); // 1 hora = 3600000 ms
        const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 minuto = 60000 ms
        const seconds = Math.floor((milliseconds % 60000) / 1000); // 1 segundo = 1000 ms
        const ms = Math.floor(milliseconds % 1000); // Milisegundos restantes

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
    };

    return (
        <View style={styles.container}>
            {/* Capa del fondo */}
            <View style={styles.backgroundLayer}>
                <Backgrounfour />
            </View>

            {/* Capa del contenido */}
            <View style={styles.contentLayer}>
                <Text style={styles.title}>Resultados</Text>

                {/* Resumen de puntos y tiempo total */}
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>Puntos totales: {totalPoints}</Text>
                    <Text style={styles.summaryText}>Tiempo total: {formatTime(totalTime)}</Text>
                </View>

                {/* Lista de preguntas */}
                <ScrollView style={styles.resultsContainer}>
                    {results.map((result, index) => (
                        <View key={index} style={styles.resultItem}>
                            <Text style={styles.questionText}>{result.question}</Text>
                            <Text style={styles.answerText}>
                                Tu respuesta:{" "}
                                <Text style={{ color: result.isCorrect ? "#4CAF50" : "#F44336" }}>
                                    {result.userAnswer}
                                </Text>
                            </Text>
                            <Text style={styles.answerText}>
                                Respuesta correcta: {result.correctAnswer}
                            </Text>
                            <Text style={styles.timeText}>
                                Tiempo: {formatTime(result.timeSpent)}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f1f1f1",
        flex: 1,
        position: "relative", // Necesario para superponer capas
    },
    backgroundLayer: {
        position: "absolute", // Fondo en una capa inferior
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1, // Capa inferior
    },
    contentLayer: {
        flex: 1,
        position: "relative", // Contenido en una capa superior
        zIndex: 2, // Capa superior
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    summaryContainer: {
        marginBottom: 20,
    },
    summaryText: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        marginBottom: 5,
    },
    resultsContainer: {
        flex: 1,
    },
    resultItem: {
        backgroundColor: "#F5F5F5",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    questionText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    answerText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    timeText: {
        fontSize: 14,
        color: "#666",
    },
});
export default ResultsScreen;