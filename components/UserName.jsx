import React from 'react';
import { Text } from 'react-native';
import { useUser } from '../hooks/useUser';

export default function UserName({ style, fallback = 'Usuario' }) {
  const { user, loading } = useUser();
  
  console.log('UserName component - user:', user);
  console.log('UserName component - loading:', loading);
  
  if (loading) return <Text style={style}>Cargando...</Text>;
  
  const displayName = user?.firstName || user?.name || user?.displayName || fallback;
  console.log('UserName component - displayName:', displayName);
  
  return <Text style={style}>{displayName}</Text>;
}