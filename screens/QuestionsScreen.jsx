import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, ActivityIndicator } from "react-native";
import SvgComponent from "../components/SvgComponent";
import PointsBar from "../components/PointsBar";
import ProfileButton from "../components/ProfileButton";
import { getForm } from "../api/forms/get-one";
import { respondForm } from "../api/forms/respond";
import { generateFormToken } from "../api/forms/generate-token";

export default function QuestionsScreen({ navigation, route }) {
    const { formId } = route.params || {};
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formToken, setFormToken] = useState(null);
    const [formTitle, setFormTitle] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [timeSpent, setTimeSpent] = useState(0);
    const answersSubmittedRef = useRef(false);
    const MAX_TIME = 15000;

    useEffect(() => {
        if (formId) {
            fetchFormQuestions();
        } else {
            setLoading(false);
        }
    }, [formId]);

    const fetchFormQuestions = async () => {
        try {
            const response = await getForm(formId);
            
            if (response.success && response.data) {
                const formData = response.data;
                let questionsData = [];

                // Almacenar el título del formulario
                setFormTitle(formData.title || formData.name || 'Trivia');

                // Manejar diferentes estructuras de respuesta
                if (formData.questions && Array.isArray(formData.questions)) {
                    questionsData = formData.questions;
                } else if (formData.data?.questions) {
                    questionsData = formData.data.questions;
                }

                // Formatear preguntas para el componente
                const formattedQuestions = questionsData.map(q => {
                    console.log('Pregunta original:', JSON.stringify(q, null, 2));
                    return {
                        id: q.id,
                        question: q.content || q.question || 'Pregunta sin contenido',
                        options: q.options || [],
                        answers: q.options ? q.options.map(opt => opt.content || opt.text || opt) : ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
                        correctAnswer: q.options ? q.options.find(opt => opt.isCorrect)?.content || q.options[0]?.content : 'Opción A'
                    };
                });

                // Obtener el token del formulario si está disponible
                console.log('Estructura completa del formulario:', JSON.stringify(formData, null, 2));
                
                // Buscar token en diferentes ubicaciones posibles
                const token = formData.content || 
                             formData.token?.content || 
                             formData.token || 
                             formData.formToken || 
                             formData.data?.content || 
                             formData.data?.token?.content || 
                             formData.data?.token || 
                             formData.data?.formToken;
                console.log('Token encontrado:', token);
                setFormToken(token || null);

                setQuestions(formattedQuestions.length > 0 ? formattedQuestions : [{
                    id: 1,
                    question: formData.title || 'Pregunta de ejemplo',
                    answers: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
                    correctAnswer: 'Opción A'
                }]);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            setError('Error al cargar las preguntas. Verifica tu conexión.');
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    // Función para enviar respuestas a la API
    const submitAnswers = async (answers) => {
        if (answersSubmittedRef.current) {
            console.log('Respuestas ya enviadas, saltando...');
            return;
        }
        answersSubmittedRef.current = true;
        console.log('Enviando respuestas por primera vez...');
        
        try {
            const apiAnswers = answers.map((answer, index) => {
                const question = questions[index];
                if (!question) {
                    console.warn(`Pregunta ${index} no encontrada`);
                    return null;
                }
                
                let selectedOption = null;
                
                if (answer.userAnswer !== "No respondida") {
                    selectedOption = question.options?.find(opt => 
                        (opt.content || opt.text) === answer.userAnswer
                    );
                }
                
                // Si no se encontró la opción, usar la primera opción disponible
                const optionToUse = selectedOption || question.options?.[0];
                
                console.log(`Pregunta ${index + 1}:`, {
                    userAnswer: answer.userAnswer,
                    selectedOptionId: optionToUse?.id,
                    isCorrect: selectedOption?.isCorrect || false
                });
                
                return {
                    questionId: question.id?.toString() || index.toString(),
                    optionId: optionToUse?.id?.toString() || '1',
                    timeSpent: answer.timeSpent || 0
                };
            }).filter(Boolean);

            // Calcular el score: 1 punto por respuesta correcta
            console.log('Respuestas para calcular score:', answers.map(a => ({ userAnswer: a.userAnswer, correctAnswer: a.correctAnswer, isCorrect: a.isCorrect })));
            const score = answers.filter(answer => answer.isCorrect === true).length;
            console.log('Score calculado:', score, 'Total respuestas:', answers.length);

            // Generar token si no existe
            let tokenToUse = formToken;
            if (!tokenToUse) {
                console.log('Generando token para el formulario...');
                const tokenResponse = await generateFormToken(formId);
                if (tokenResponse.success) {
                    // El token está en data.token.content según la respuesta
                    const tokenData = tokenResponse.data;
                    tokenToUse = tokenData?.token?.content || tokenData?.content || tokenData?.token || tokenData?.formToken;
                    console.log('Token generado exitosamente:', tokenToUse);
                    
                    if (!tokenToUse) {
                        console.error('Token generado pero no encontrado en la respuesta:', tokenResponse.data);
                        return;
                    }
                } else {
                    console.error('Error generando token:', tokenResponse.error);
                    return;
                }
            }

            // Asegurar que tokenToUse sea solo el string del token
            const finalToken = typeof tokenToUse === 'object' ? tokenToUse.content : tokenToUse;

            console.log('=== DATOS ENVIADOS AL SERVIDOR ===');
            console.log('FormToken:', finalToken);
            console.log('Answers completas:', JSON.stringify(apiAnswers, null, 2));
            console.log('=== FIN DATOS ===');
            const response = await respondForm(formId, {
                formToken: finalToken,
                answers: apiAnswers
            });

            if (response.success) {
                console.log('Respuestas enviadas correctamente:', response.data);
                return response.data; // Retornar los datos del servidor
            } else {
                console.error('Error al enviar respuestas:', response.error || 'Error desconocido');
                console.error('Respuesta completa:', response);
                return null;
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
            console.error('Datos enviados:', { formToken: finalToken, answers: apiAnswers, score: score });
        }
    };

    // Función para manejar la selección de respuesta
    const handleAnswer = async (answer) => {
        const currentQuestion = questions[currentQuestionIndex];
        // Buscar la opción seleccionada en las opciones de la pregunta
        const selectedOption = currentQuestion.options?.find(opt => opt.content === answer);
        const isCorrect = selectedOption?.isCorrect || false;

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

            // Enviar respuestas a la API antes de navegar
            const serverResponse = await submitAnswers(updatedUserAnswers);
            navigation.navigate("ResultsScreen", { 
                results: updatedUserAnswers, 
                formId,
                formTitle,
                serverScore: serverResponse?.score || serverResponse?.data?.score || null
            });
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
                const currentQuestion = questions[currentQuestionIndex];
                setUserAnswers((prev) => [
                    ...prev,
                    {
                        question: currentQuestion.question,
                        userAnswer: "No respondida",
                        correctAnswer: currentQuestion.correctAnswer,
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
                    // Enviar respuestas a la API antes de navegar
                    const currentQuestion = questions[currentQuestionIndex];
                    const finalAnswers = [...userAnswers, {
                        question: currentQuestion.question,
                        userAnswer: "No respondida",
                        correctAnswer: currentQuestion.correctAnswer,
                        timeSpent: MAX_TIME,
                        isCorrect: false,
                    }];
                    submitAnswers(finalAnswers).then(serverResponse => {
                        navigation.navigate("ResultsScreen", { 
                            results: finalAnswers, 
                            formId,
                            formTitle,
                            serverScore: serverResponse?.score || serverResponse?.data?.score || null
                        });
                    });
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

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Cargando preguntas...</Text>
            </View>
        );
    }

    if (error || questions.length === 0) {
        return (
            <View style={[styles.container, styles.emptyContainer]}>
                <Text style={styles.emptyText}>
                    {error || (!formId ? 'No se especificó un formulario' : 'No hay preguntas disponibles')}
                </Text>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
                {error && (
                    <TouchableOpacity 
                        style={[styles.backButton, { marginTop: 10, backgroundColor: '#FF9800' }]}
                        onPress={() => {
                            setError(null);
                            setLoading(true);
                            fetchFormQuestions();
                        }}
                    >
                        <Text style={styles.backButtonText}>Reintentar</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            {/* Barra de puntos */}
            <View style={styles.scoreBar}>
                <ProfileButton onPress={() => navigation.navigate("UserProfileScreen")} />
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
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    backButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});