import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function ProfileButton({ imageSource, onPress, style }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginLeft: 40,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
