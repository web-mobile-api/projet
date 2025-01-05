import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LanguageProvider } from './LanguageContext';
import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import SignInScreen from './SignInScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import HomeScreen from './HomeScreen';
import EventDetailsScreen from './EventDetailsScreen';
import CreateEventScreen from './CreateEventScreen';
import FriendsScreen from './FriendsScreen';
import InvitationsScreen from './InvitationsScreen';
import SuggestionsScreen from './SuggestionsScreen';
import SettingsScreen from './SettingsScreen';
import 'react-native-get-random-values';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Friends" component={FriendsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Invitations" component={InvitationsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Suggestions" component={SuggestionsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
