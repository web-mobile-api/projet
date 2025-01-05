import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LanguageContext } from './LanguageContext';
import { AccountController } from '../controller/accountController';

const LoginScreen = ({ navigation }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log(email, password);
      const _ = await AccountController.login(email, password);
      navigation.navigate('Home');
    } catch (err) {
      console.log(err)
    }
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? "E-mail" : "Email"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? "Mot de passe" : "Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{language === 'fr' ? "Se connecter" : "Log in"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>{language === 'fr' ? "Mot de passe oublié ?" : "Forgot password?"}</Text>
      </TouchableOpacity>
      <View style={styles.signinContainer}>
        <Text style={styles.signinText}>{language === 'fr' ? "Vous n'avez pas de compte ?" : "Don't have an account?"} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signinLink}>{language === 'fr' ? "Inscrivez-vous" : "Sign up"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.languageButtonsContainer}>
        <TouchableOpacity style={styles.languageButton} onPress={() => toggleLanguage('fr')}>
          <View style={styles.flagContainer}>
            <Image source={require('./assets/france.png')} style={styles.flag} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton} onPress={() => toggleLanguage('en')}>
          <View style={styles.flagContainer}>
            <Image source={require('./assets/usa.png')} style={styles.flag} />
          </View>
        </TouchableOpacity>
      </View>
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
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#6200EE',
    marginBottom: 12,
  },
  signinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signinText: {
    color: '#000',
  },
  signinLink: {
    color: '#6200EE',
  },
  languageButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  languageButton: {
    marginHorizontal: 10,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    width: 40, 
    height: 30, 
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  flag: {
    width: 30,
    height: 20,
  },
});

export default LoginScreen;
