import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';
import { Ionicons } from '@expo/vector-icons';
import { LanguageContext } from './LanguageContext';
import { registerAccount } from '../services/accountService';

const SignInScreen = ({ navigation }) => {
  const { language } = useContext(LanguageContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const actionSheetRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || libraryStatus.status !== 'granted') {
        Alert.alert('Permission refusée', 'Désolé, nous avons besoin de l\'autorisation pour accéder à votre galerie et à votre appareil photo.');
      }
    })();
  }, []);

  const handleSignIn = async () => {
    let errors = {};

    if (!firstName) {
      errors.firstName = language === 'fr' ? 'Le prénom est requis.' : 'First name is required.';
    }
    if (!lastName) {
      errors.lastName = language === 'fr' ? 'Le nom est requis.' : 'Last name is required.';
    }
    if (!email) {
      errors.email = language === 'fr' ? 'L\'email est requis.' : 'Email is required.';
    }
    if (!phoneNumber) {
      errors.phoneNumber = language === 'fr' ? 'Le numéro de téléphone est requis.' : 'Phone number is required.';
    }
    if (!birthdate) {
      errors.birthdate = language === 'fr' ? 'La date de naissance est requise.' : 'Birthdate is required.';
    }
    if (!password) {
      errors.password = language === 'fr' ? 'Le mot de passe est requis.' : 'Password is required.';
    }
    if (!confirmPassword) {
      errors.confirmPassword = language === 'fr' ? 'La confirmation du mot de passe est requise.' : 'Confirm password is required.';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = language === 'fr' ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.';
    }
    if (!profilePhoto) {
      errors.profilePhoto = language === 'fr' ? 'Une photo de profil est requise.' : 'Profile photo is required.';
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await registerAccount({
        firstName,
        lastName,
        email,
        phoneNumber,
        birthdate,
        password,
        profilePhoto
      });
      Alert.alert(language === 'fr' ? 'Inscription réussie!' : 'Registration successful!');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert(language === 'fr' ? 'Erreur' : 'Error', err?.response?.data?.message || err.message || 'Registration failed.');
    }
  };

  const handleChoosePhoto = async (source) => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const showImagePickerOptions = () => {
    actionSheetRef.current.show();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? 'Prénom' : 'First Name'}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? 'Nom' : 'Last Name'}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? 'E-Mail' : 'Email'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <View style={styles.inputContainer}>
        <Ionicons name="call" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? 'Numéro de téléphone' : 'Phone Number'}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
      <View style={styles.inputContainer}>
        <Ionicons name="calendar" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? 'Date de naissance (JJ/MM/AAAA)' : 'Birthdate (DD/MM/YYYY)'}
          value={birthdate}
          onChangeText={setBirthdate}
        />
      </View>
      {errors.birthdate && <Text style={styles.errorText}>{errors.birthdate}</Text>}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? 'Mot de passe' : 'Password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="#6200EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={language === 'fr' ? 'Confirmation mot de passe' : 'Confirm Password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      <TouchableOpacity style={styles.button} onPress={showImagePickerOptions}>
        <Text style={styles.buttonText}>{language === 'fr' ? 'Choisir une photo de profil' : 'Choose a profile photo'}</Text>
      </TouchableOpacity>
      {errors.profilePhoto && <Text style={styles.errorText}>{errors.profilePhoto}</Text>}
      {profilePhoto && <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>{language === 'fr' ? 'Créer mon compte' : 'Create my account'}</Text>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        title={language === 'fr' ? 'Choisir une photo' : 'Choose a photo'}
        options={[language === 'fr' ? 'Annuler' : 'Cancel', language === 'fr' ? 'Prendre une photo' : 'Take a photo', language === 'fr' ? 'Choisir de la galerie' : 'Choose from gallery']}
        cancelButtonIndex={0}
        onPress={(index) => {
          if (index === 1) {
            handleChoosePhoto('camera');
          } else if (index === 2) {
            handleChoosePhoto('library');
          }
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default SignInScreen;
