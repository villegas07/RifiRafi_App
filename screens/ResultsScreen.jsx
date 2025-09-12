import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, BackHandler } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Backgrounfour from '../components/Backgrounfour';
import Avatar from '../components/Avatar';
import { useUser } from '../hooks/useUser';

const ResultsScreen = ({ route, navigation }) => {
    const { user } = useUser();
    const { results, serverScore } = route.params;

    const correctAnswers = results.filter((result) => result.isCorrect).length;
    const totalPoints = serverScore !== null ? serverScore : correctAnswers * 1;
    const totalTime = results.reduce((sum, result) => sum + result.timeSpent, 0);

    useEffect(() => {
        const backAction = () => {
            return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    const formatTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor(milliseconds % 1000);

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundLayer}>
                <Backgrounfour />
            </View>

            <View style={styles.contentLayer}>
                <LinearGradient
                    colors={['#2CC364FF', '#D5C620FF']}
                    style={styles.header}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
                        <Avatar user={user} size={50} />
                    </TouchableOpacity>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user?.firstName || user?.name || 'Usuario'}</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Ionicons name="checkmark-circle" size={16} color="white" />
                                <Text style={styles.statText}>{correctAnswers} correctas</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="time" size={16} color="white" />
                                <Text style={styles.statText}>{formatTime(totalTime)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.pointsCard}>
                        <Ionicons name="star" size={20} color="#FFD700" />
                        <Text style={styles.pointsText}>{totalPoints}</Text>
                    </View>
                </LinearGradient>
                
                <View style={styles.titleContainer}>
                    <Ionicons name="analytics" size={32} color="#2CC364FF" />
                    <Text style={styles.title}>Resultados</Text>
                </View>

                <FlatList
                    data={results}
                    keyExtractor={(item, index) => `question_${index}_${item.question?.slice(0, 5) || 'q'}`}
                    showsVerticalScrollIndicator={false}
                    style={styles.resultsContainer}
                    renderItem={({ item: result, index }) => (
                        <View style={styles.resultItem}>
                            <View style={styles.questionHeader}>
                                <View style={styles.questionNumber}>
                                    <Text style={styles.questionNumberText}>{index + 1}</Text>
                                </View>
                                <Ionicons 
                                    name={result.isCorrect ? "checkmark-circle" : "close-circle"} 
                                    size={24} 
                                    color={result.isCorrect ? "#4CAF50" : "#F44336"} 
                                />
                            </View>
                            
                            <Text style={styles.questionText}>{result.question}</Text>
                            
                            <View style={styles.answerContainer}>
                                <View style={styles.answerRow}>
                                    <Ionicons name="person" size={16} color="#666" />
                                    <Text style={styles.answerLabel}>Tu respuesta: </Text>
                                    <Text style={[styles.answerValue, { color: result.isCorrect ? "#4CAF50" : "#F44336" }]}>
                                        {result.userAnswer}
                                    </Text>
                                </View>
                                
                                <View style={styles.answerRow}>
                                    <Ionicons name="checkmark" size={16} color="#4CAF50" />
                                    <Text style={styles.answerLabel}>Correcta: </Text>
                                    <Text style={styles.correctAnswer}>{result.correctAnswer}</Text>
                                </View>
                                
                                <View style={styles.answerRow}>
                                    <Ionicons name="time" size={16} color="#2196F3" />
                                    <Text style={styles.answerLabel}>Tiempo: </Text>
                                    <Text style={styles.timeValue}>{formatTime(result.timeSpent)}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
                
                <TouchableOpacity 
                    style={styles.homeButton}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })}
                >
                    <Ionicons name="home" size={24} color="white" />
                    <Text style={styles.homeButtonText}>Ir a Inicio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f9fa",
        flex: 1,
        position: "relative",
    },
    backgroundLayer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    contentLayer: {
        flex: 1,
        position: "relative",
        zIndex: 2,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    userInfo: {
        marginLeft: 15,
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 15,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '600',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 10,
    },
    resultsContainer: {
        flex: 1,
    },
    resultItem: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    questionNumber: {
        backgroundColor: '#2CC364FF',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    questionText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 15,
        lineHeight: 22,
    },
    answerContainer: {
        gap: 8,
    },
    answerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    answerLabel: {
        fontSize: 14,
        color: "#666",
        marginLeft: 8,
        fontWeight: '500',
    },
    answerValue: {
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
    },
    correctAnswer: {
        fontSize: 14,
        color: "#4CAF50",
        fontWeight: '600',
        flex: 1,
    },
    timeValue: {
        fontSize: 14,
        color: "#2196F3",
        fontWeight: '600',
        flex: 1,
    },
    pointsCard: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    pointsText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    homeButton: {
        backgroundColor: '#2CC364FF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        gap: 10,
    },
    homeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ResultsScreen;