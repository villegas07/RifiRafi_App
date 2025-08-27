import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

export default function Avatar({ user, size = 50, style }) {
  const fullName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.firstName || user?.name || '';
  const initials = getInitials(fullName);
  
  if (user?.picture) {
    return (
      <Image 
        source={{ uri: user.picture }} 
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }, style]} 
      />
    );
  }

  return (
    <View style={[
      styles.initialsContainer, 
      { width: size, height: size, borderRadius: size / 2 }, 
      style
    ]}>
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#f0f0f0',
  },
  initialsContainer: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#fff',
    fontWeight: 'bold',
  },
});