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

  // Formatear fechas
  const formatDateRange = (startDate, endDate) => {
    const formatDate = (date) => {
      if (!date) return null;
      return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };
    
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    
    if (start && end) {
      return `Válido del ${start} al ${end}`;
    } else if (end) {
      return `Válido hasta ${end}`;
    } else if (start) {
      return `Disponible desde ${start}`;
    }
    return 'Disponible ahora';
  };

  // Filtrar formularios activos y formatear como promociones
  const now = new Date();
  const activePromotions = forms.filter(form => {
    const startDate = form.startDate ? new Date(form.startDate) : null;
    const endDate = form.expirationDate ? new Date(form.expirationDate) : (form.endDate ? new Date(form.endDate) : null);
    
    // Si hay fecha de inicio, debe haber comenzado
    if (startDate && now < startDate) return false;
    
    // Si hay fecha de fin, no debe haber expirado
    if (endDate && now > endDate) return false;
    
    return true;
  });

  const promotions = activePromotions.map(form => ({
    id: form.id,
    text: form.title,
    description: form.description,
    image: require('../assets/test.png'),
    validity: formatDateRange(form.startDate, form.expirationDate || form.endDate),
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