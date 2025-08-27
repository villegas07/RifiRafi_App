jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  Image: 'Image',
  Alert: { alert: jest.fn() },
  Animated: {
    Value: jest.fn(() => ({ setValue: jest.fn() })),
    View: 'Animated.View'
  },
  ActivityIndicator: 'ActivityIndicator'
}));

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  MediaTypeOptions: { Images: 'Images' }
}));