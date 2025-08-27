import { useState, useEffect } from 'react';
import { getUser } from '../api/users/get-one';
import { updateUserPicture } from '../api/users/update-picture';
import { updateUser } from '../api/users/update';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUser('me');
      console.log('User API response:', response);
      if (response.success) {
        console.log('User data:', response.data);
        setUser(response.data);
        setError(null);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePicture = async (imageUri) => {
    try {
      const pictureFile = {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      };

      const response = await updateUserPicture('me', pictureFile);
      if (response.success) {
        await fetchUser();
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateUserData = async (userData) => {
    try {
      const response = await updateUser('me', userData);
      if (response.success) {
        await fetchUser();
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
    updateProfilePicture,
    updateUserData,
  };
};