import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Button, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import ActionSheet from 'react-native-actionsheet';
import * as Location from 'expo-location';

const CreateEventScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Type');
  const [price, setPrice] = useState('');
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
        Alert.alert('Permission refusée', 'Désolé, nous avons besoin de l\'autorisation de la caméra pour prendre des photos.');
      }

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status !== 'granted') {
        Alert.alert('Permission refusée', 'Désolé, nous avons besoin de l\'autorisation de localisation pour obtenir votre adresse.');
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
  }, []);

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
    const newEvent = {
      id: uuidv4(),
      title,
      description,
      type,
      price: parseFloat(price),
      startDate: { day: startDate.getDate(), month: startDate.getMonth() + 1, year: startDate.getFullYear() },
      endDate: { day: endDate.getDate(), month: endDate.getMonth() + 1, year: endDate.getFullYear() },
      startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      organisateur,
      image,
      interestedCount: 0,
      publicInfo,
      address, // Ajouter l'adresse au nouvel événement
      coordinate: coordinates,
    };

    navigation.navigate('Home', { newEvent });
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
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Type" value="Type" />
          <Picker.Item label="Soirée" value="Soirée" />
          <Picker.Item label="Concert" value="Concert" />
          <Picker.Item label="Événement sportif" value="Événement sportif" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Prix"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Organisateur"
        value={organisateur}
        onChangeText={setOrganisateur}
      />
      <TextInput
        style={styles.input}
        placeholder="Pour qui ?"
        value={publicInfo}
        onChangeText={setPublicInfo}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
        editable={true} 
      />
      <Text style={styles.label}>Heure de début</Text>
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
      <Text style={styles.label}>Heure de fin</Text>
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
      <Text style={styles.label}>Date de début</Text>
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
      <Text style={styles.label}>Date de fin</Text>
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
        <Text style={styles.imagePickerText}>Ajouter une photo</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>Créer l'événement</Text>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        title="Choisir une photo"
        options={['Annuler', 'Prendre une photo', 'Choisir de la galerie']}
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
    marginBottom: 10,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#6200EE',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 10,
    borderColor: '#6200EE',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 60,
    fontSize: 16,
  },
  datePickerButtonTextGray: {
    color: 'gray',
    textAlign: 'center',
  },
  imagePicker: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#6200EE',
  },
  createButton: {
    backgroundColor: '#FFD700', // Couleur jaune doré
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateEventScreen;
