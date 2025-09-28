import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import SessionManager from './components/SessionManager';
import SplashScreen from './screens/SplashScreen'; // Importa la pantalla de precarga
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import BrainScreen from './screens/BrainScreen';
import IdeasScreen from './screens/IdeasScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MessagesScreen from './screens/MessagesScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import PerfilScreen from './screens/PerfilScreen';
import QRScreen from './screens/QRScreen';
import PaymentScreen from './screens/PaymentScreen';
import SecurityScreen from './screens/SecurityScreen';
import SettingScreen from './screens/SettingScreen';
import QuestionsScreen from './screens/QuestionsScreen';
import RegisterScreen from './screens/RegisterScreen';
import WompiWidgetScreen from './screens/WompiWidgetScreen';
import ResultsScreen from './screens/ResultsScreen';
import ForgotYourPasswordScreen from './screens/ForgotYourPasswordScreen';
import PromotionsScreen from './screens/PromotionsScreen';
import CommentsScreen from './screens/CommentsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Pantalla de precarga */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* Resto de las pantallas */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Brain"
          component={BrainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ideas"
          component={IdeasScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Messages"
          component={MessagesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "#000",
          }}
        />
        <Stack.Screen
          name="PerfilScreen"
          component={PerfilScreen} options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "#000",
          }}
        />
        <Stack.Screen
          name="QRScreen"
          component={QRScreen}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "#000",
          }}
        />
        <Stack.Screen
          name="SecurityScreen"
          component={SecurityScreen}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "#000",
          }}

        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuestionsScreen"
          component={QuestionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen} options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "#000",
          }}

        />
        <Stack.Screen
          name="ForgotYourPasswordScreen"
          component={ForgotYourPasswordScreen} options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "#000",
          }}
        />
        <Stack.Screen
          name="WompiWidgetScreen"
          component={WompiWidgetScreen} options={{
            headerTransparent: true,
            headerTitle: "Pago con Wompi",
            headerTintColor: "##0FAC39",
          }}
        />
        <Stack.Screen
          name="ResultsScreen"
          component={ResultsScreen} options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "##0FAC39",
          }}
        />
        <Stack.Screen
          name="PromotionsScreen"
          component={PromotionsScreen}
          options={{
            headerTransparent: true,
            headerTitle: "Rifi-Rafis disponibles",
            headerTintColor: "#000",
          }}
        />
        <Stack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
      <SessionManager />
      </NavigationContainer>
    </AuthProvider>
  );
}