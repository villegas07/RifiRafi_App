import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../hooks/useUser';
import Avatar from './Avatar';

export default function UserAvatar({ size = 50, showName = false, onPress }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]} />
      </View>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      disabled={!onPress}
    >
      <Avatar user={user} size={size} />
      {showName && user?.name && (
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  placeholder: {
    backgroundColor: '#e0e0e0',
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});