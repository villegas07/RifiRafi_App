import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '../hooks/useUser';
import Avatar from './Avatar';

export default function ProfileButton({ onPress, style, size = 50 }) {
    const { user } = useUser();
    
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Avatar user={user} size={size} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginLeft: 40,
    },
});
