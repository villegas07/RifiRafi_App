import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import PuzzleBackground from '../components/BackgroundSecon';
import PromotionCard from '../components/PromotionCard';
import LoadingState from '../components/LoadingState';
import { useForms } from '../hooks/useForms';

export default function PromotionsScreen({ navigation }) {
  const { 
    forms, 
    loading, 
    refreshing, 
    error, 
    refresh, 
    retry 
  } = useForms({ limit: 50 });

  // Formatear los formularios como promociones
  const promotions = forms.map(form => ({
    id: form.id,
    text: form.title,
    description: form.description,
    image: require('../assets/test.png'),
    validity: form.endDate 
      ? `Válido hasta ${new Date(form.endDate).toLocaleDateString()}`
      : 'Disponible ahora',
    questions: form.questions,
    category: form.category,
    difficulty: form.difficulty,
    formData: form.rawData
  }));

  const renderPromotion = ({ item }) => (
    <PromotionCard
      promotion={item}
      onPress={(promotion) => navigation.navigate('QuestionsScreen', { formId: promotion.id })}
    />
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <PuzzleBackground />
        <LoadingState 
          loading={true} 
          loadingText="Cargando promociones..." 
        />
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={['#FFD700']}
            tintColor="#FFD700"
          />
        }

        ListEmptyComponent={
          <LoadingState
            error={error}
            empty={!error && promotions.length === 0}
            onRetry={retry}
            emptyText="No hay promociones disponibles"
            errorText={error}
          />
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


});