import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import PuzzleBackground from '../components/BackgroundSecon';
import { promotions } from '../utils/promotionsData';

export default function PromotionsScreen({ navigation }) {
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

  return (
    <View style={styles.container}>
      <PuzzleBackground />
      
      <FlatList
        data={promotions}
        renderItem={renderPromotion}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
});