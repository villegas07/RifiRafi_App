import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CommentsPreview from './CommentsPreview';

const PromotionCardWithComments = ({ 
  promotion, 
  onPress,
  onCommentsPress,
  showComments = true,
  style = {},
  imageStyle = {},
  textStyle = {} 
}) => {
  const handlePress = () => {
    if (onPress && promotion?.id) {
      onPress(promotion);
    }
  };

  const handleCommentsPress = (formId, shouldScroll = false) => {
    if (onCommentsPress) {
      onCommentsPress(formId, shouldScroll);
    }
  };

  if (!promotion) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.promotionCard}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={[styles.promotionText, textStyle]} numberOfLines={2}>
              {promotion.text || 'Trivia disponible'}
            </Text>
            
            {promotion.description ? (
              <Text style={styles.promotionDescription} numberOfLines={2}>
                {promotion.description}
              </Text>
            ) : null}
            
            <View style={styles.infoRow}>
              <Text style={styles.questionsCount}>
                {promotion.questions || 5} preguntas
              </Text>
              
              {promotion.category && (
                <Text style={styles.category}>
                  {typeof promotion.category === 'string' ? promotion.category : 'Categoría'}
                </Text>
              )}
            </View>
          </View>
          
          <Image 
            source={promotion.image || require('../assets/test.png')} 
            style={[styles.promotionImage, imageStyle]} 
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.validity}>
            {promotion.validity || 'Disponible ahora'}
          </Text>
          
          {promotion.difficulty && (
            <Text style={[styles.difficulty, getDifficultyStyle(promotion.difficulty)]}>
              {typeof promotion.difficulty === 'string' ? promotion.difficulty : 'Normal'}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Vista previa de comentarios */}
      {showComments && promotion.id && (
        <CommentsPreview
          formId={promotion.id}
          onViewAllPress={handleCommentsPress}
          maxComments={2}
        />
      )}
    </View>
  );
};

const getDifficultyStyle = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
    case 'fácil':
      return { color: '#4CAF50' };
    case 'medium':
    case 'medio':
      return { color: '#FF9800' };
    case 'hard':
    case 'difícil':
      return { color: '#F44336' };
    default:
      return { color: '#666' };
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  promotionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  promotionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    lineHeight: 22,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  questionsCount: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginRight: 10,
  },
  category: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  promotionImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  validity: {
    fontSize: 12,
    color: '#888',
    flex: 1,
  },
  difficulty: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default PromotionCardWithComments;