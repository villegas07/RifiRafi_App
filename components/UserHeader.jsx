import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from './Avatar';
import PointsBar from './PointsBar';
import { useUser } from '../hooks/useUser';

export default function UserHeader({ navigation, showPoints = true }) {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
        <Avatar user={user} size={50} />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user?.firstName || user?.name || 'Usuario'}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
      </View>
      {showPoints && (
        <PointsBar onPress={() => navigation.navigate('PaymentScreen')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});