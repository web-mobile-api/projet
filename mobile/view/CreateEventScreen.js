import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Button, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import ActionSheet from 'react-native-actionsheet';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const CreateEventScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Type');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [organisateur, setOrganisateur] = useState('');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [publicInfo, setPublicInfo] = useState('');
  const [location, setLocation] = useState(null);
  const [showAddressPicker, setShowAddressPicker] = useState(false);
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Désolé, nous avons besoin de l\'autorisation de la caméra pour prendre des photos.');
      }

      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        Alert.alert('Permission refusée', 'Désolé, nous avons besoin de l\'autorisation de localisation pour suggérer des adresses.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const showImagePickerOptions = () => {
    actionSheetRef.current.show();
  };

  const handleCreateEvent = () => {
    const newEvent = {
      id: uuidv4(),
      title,
      description,
      type,
      price: parseFloat(price),
      date: { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() },
      startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      organisateur,
      image,
      interestedCount: 0,
      locationDetails: address,
      publicInfo,
    };

    navigation.navigate('Home', { newEvent });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
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

  const handleAddressChange = (data, details = null) => {
    setAddress(data.description);
    setLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    setShowAddressPicker(false);
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
      <Text style={styles.label}>Date de l'événement</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerButtonText}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}
      <Text style={styles.label}>Heure de début</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowStartTimePicker(true)}>
        <Text style={styles.datePickerButtonText}>
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
        <Text style={styles.datePickerButtonText}>
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
      <TextInput
        style={styles.input}
        placeholder="Organisateur"
        value={organisateur}
        onChangeText={setOrganisateur}
      />
      <TouchableOpacity style={styles.imagePicker} onPress={showImagePickerOptions}>
        <Text style={styles.imagePickerText}>Ajouter une photo</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.input} onPress={() => setShowAddressPicker(true)}>
        <Text style={styles.datePickerButtonText}>
          {address || 'Choisir une adresse'}
        </Text>
      </TouchableOpacity>
      {showAddressPicker && (
        <GooglePlacesAutocomplete
          placeholder="Adresse"
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed="auto"
          fetchDetails={true}
          renderDescription={(row) => row.description}
          onPress={handleAddressChange}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyCidfAwZPAdobSOEFhz3wVyirYaXyA2C7A',
            language: 'fr',
          }}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          currentLocation={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          GoogleReverseGeocodingQuery={{}}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            types: 'address',
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          debounce={200}
        />
      )}
      {location && (
        <MapView style={styles.map} region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
          <Marker coordinate={location.coords} />
        </MapView>
      )}
      <TextInput
        style={styles.input}
        placeholder="Pour qui ?"
        value={publicInfo}
        onChangeText={setPublicInfo}
      />
      <Button title="Créer l'événement" onPress={handleCreateEvent} />
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
  datePickerButtonText: {
    color: '#6200EE',
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
  map: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default CreateEventScreen;
