import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useUser } from "../hooks/useUser";

export default function PointsBar({ onPress }) {
    const { user } = useUser();
    
    return (
        <TouchableOpacity style={styles.pointsContainer} onPress={onPress}>
            <Image source={require("../assets/Monedero.png")} style={styles.pointsIcon} />
            <Text style={styles.pointsValue}>{user?.points || 0}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    pointsContainer: {
        flexDirection: "row",
        maxHeight: 40,
        alignItems: "center",
        backgroundColor: "#FFD700",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
    },
    pointsIcon: {
        width: 35,
        height: 35,
        resizeMode: "contain",
        marginRight: 5,
        marginLeft: -12,
    },
    pointsValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
});
