import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import PuzzleBackground from '../components/BackgroundSecon';
import { getAllForms } from '../api/forms/get-all';

export default function PromotionsScreen({ navigation }) {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await getAllForms({ limit: 20 });
      if (response.success && response.data?.forms) {
        const formattedPromotions = response.data.forms.map(form => ({
          id: form.id,
          text: form.title || 'Participa en esta trivia',
          image: require('../assets/test.png'),
          validity: `Válido hasta ${new Date(form.endDate).toLocaleDateString()}`,
          screen: 'QuestionsScreen',
          formData: form
        }));
        setPromotions(formattedPromotions);
      }
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };
  const renderPromotion = ({ item }) => (
    <TouchableOpacity
      style={styles.promotionCard}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.promotionText}>{item.text}</Text>
        <Image source={item.image} style={styles.promotionImage} />
      </View>
      <Text style={styles.validity}>{item.validity}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <PuzzleBackground />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Cargando promociones...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PuzzleBackground />
      
      <FlatList
        data={promotions}
        renderItem={renderPromotion}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay promociones disponibles</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 20,
  },
  promotionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promotionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    flex: 1,
    marginRight: 15,
  },
  promotionImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  validity: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});