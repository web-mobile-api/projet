import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LanguageContext } from './LanguageContext';

const ForgotPasswordScreen = ({ navigation }) => {
  const { language } = useContext(LanguageContext);

  const handleSend = () => {
    // Logique pour envoyer l'e-mail
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>{language === 'fr' ? "Mot de passe oublié ?" : "Forgot password?"}</Text>
      <Text style={styles.text}>{language === 'fr' ? "Saisissez l'adresse e-mail associée à votre compte." : "Enter the email address associated with your account."}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? "E-Mail" : "Email"}
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>{language === 'fr' ? "Envoyer" : "Send"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    marginBottom: 12,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
