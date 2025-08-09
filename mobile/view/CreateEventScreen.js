import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { createEvent } from '../services/eventService';
import DateTimePicker from '@react-native-community/datetimepicker';
import ActionSheet from 'react-native-actionsheet';
import * as Location from 'expo-location';
import { LanguageContext } from './LanguageContext';

const CreateEventScreen = () => {
  const { language } = useContext(LanguageContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [organisateur, setOrganisateur] = useState('');
  const [image, setImage] = useState(null);
  const [publicInfo, setPublicInfo] = useState('');
  const [address, setAddress] = useState(''); // État pour l'adresse
  const [coordinates, setCoordinates] = useState(null); // État pour les coordonnées
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          language === 'fr' ? 'Permission refusée' : 'Permission Denied',
          language === 'fr' ? 'Désolé, nous avons besoin de l\'autorisation de la caméra pour prendre des photos.' : 'Sorry, we need camera permission to take photos.'
        );
      }

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status !== 'granted') {
        Alert.alert(
          language === 'fr' ? 'Permission refusée' : 'Permission Denied',
          language === 'fr' ? 'Désolé, nous avons besoin de l\'autorisation de localisation pour obtenir votre adresse.' : 'Sorry, we need location permission to get your address.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCoordinates({ latitude, longitude });

      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (reverseGeocode.length > 0) {
        const { street, city, region, postalCode, country } = reverseGeocode[0];
        setAddress(`${street}, ${city}, ${region} ${postalCode}, ${country}`);
      }
    })();
  }, [language]);

  const handleImagePicker = async (source) => {
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
      setImage(result.uri);
    }
  };

  const showImagePickerOptions = () => {
    actionSheetRef.current.show();
  };

  const handleCreateEvent = async () => {
    try {
      await createEvent({
        title,
        description,
        startDate,
        endDate,
        startTime,
        endTime,
        organisateur,
        publicInfo,
        address,
        coordinates,
        image
      });
      Alert.alert(language === 'fr' ? "Événement créé !" : "Event created!");
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert(language === 'fr' ? 'Erreur' : 'Error', err?.response?.data?.message || err.message || 'Event creation failed.');
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const onChangeStartTime = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentTime);
  };

  const onChangeEndTime = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentTime);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder={language === 'fr' ? "Titre" : "Title"}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder={language === 'fr' ? "Description" : "Description"}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder={language === 'fr' ? "Organisateur" : "Organizer"}
        value={organisateur}
        onChangeText={setOrganisateur}
      />
      <TextInput
        style={styles.input}
        placeholder={language === 'fr' ? "Pour qui ?" : "For whom?"}
        value={publicInfo}
        onChangeText={setPublicInfo}
      />
      <TextInput
        style={styles.input}
        placeholder={language === 'fr' ? "Adresse" : "Address"}
        value={address}
        onChangeText={setAddress}
        editable={true}
      />
      <Text style={styles.label}>{language === 'fr' ? "Heure de début" : "Start Time"}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowStartTimePicker(true)}>
        <Text style={styles.datePickerButtonTextGray}>
          {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          testID="startTimePicker"
          value={startTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeStartTime}
        />
      )}
      <Text style={styles.label}>{language === 'fr' ? "Heure de fin" : "End Time"}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowEndTimePicker(true)}>
        <Text style={styles.datePickerButtonTextGray}>
          {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          testID="endTimePicker"
          value={endTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeEndTime}
        />
      )}
      <Text style={styles.label}>{language === 'fr' ? "Date de début" : "Start Date"}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.datePickerButtonTextGray}>
          {startDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          testID="startDatePicker"
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStartDate}
          minimumDate={new Date()}
        />
      )}
      <Text style={styles.label}>{language === 'fr' ? "Date de fin" : "End Date"}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.datePickerButtonTextGray}>
          {endDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          testID="endDatePicker"
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
          minimumDate={startDate}
        />
      )}
      <TouchableOpacity style={styles.imagePicker} onPress={showImagePickerOptions}>
        <Text style={styles.imagePickerText}>{language === 'fr' ? "Ajouter une photo" : "Add a photo"}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>{language === 'fr' ? "Créer l'événement" : "Create Event"}</Text>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        title={language === 'fr' ? "Choisir une photo" : "Choose a photo"}
        options={[language === 'fr' ? 'Annuler' : 'Cancel', language === 'fr' ? 'Prendre une photo' : 'Take a photo', language === 'fr' ? 'Choisir de la galerie' : 'Choose from gallery']}
        cancelButtonIndex={0}
        onPress={(index) => {
          if (index === 1) {
            handleImagePicker('camera');
          } else if (index === 2) {
            handleImagePicker('library');
          }
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#6200EE',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  datePickerButtonTextGray: {
    color: 'gray',
    textAlign: 'center',
  },
  imagePicker: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#FFD700', // Couleur jaune doré
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateEventScreen;
