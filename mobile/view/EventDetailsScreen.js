import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button, ScrollView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider as PaperProvider } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import * as Location from 'expo-location';
import { LanguageContext } from './LanguageContext';

const initialEvents = [
  {
    id: '1',
    title: 'Concert de Jazz',
    description: 'Un concert de jazz en plein air.',
    startDate: { year: 2023, month: 10, day: 15 },
    startTime: '18:00',
    endTime: '20:00',
    address: 'Place d\'Armes, Namur',
    interestedCount: 50,
    organisateur: 'Jazz Namur',
    publicInfo: 'Entrée gratuite',
    image: 'https://via.placeholder.com/300',
    coordinate: { latitude: 50.4667, longitude: 4.8667 },
  },
  {
    id: '2',
    title: 'Marché de Noël',
    description: 'Un marché de Noël avec des stands de nourriture et des cadeaux.',
    startDate: { year: 2023, month: 12, day: 20 },
    startTime: '10:00',
    endTime: '22:00',
    address: 'Place d\'Armes, Namur',
    interestedCount: 100,
    organisateur: 'Ville de Namur',
    publicInfo: 'Entrée libre',
    image: 'https://via.placeholder.com/300',
    coordinate: { latitude: 50.4667, longitude: 4.8667 },
  },
  {
    id: '3',
    title: 'Exposition d\'Art',
    description: 'Une exposition d\'art contemporain.',
    startDate: { year: 2023, month: 11, day: 5 },
    startTime: '14:00',
    endTime: '18:00',
    address: 'Place d\'Armes, Namur',
    interestedCount: 30,
    organisateur: 'Galerie d\'Art Namur',
    publicInfo: 'Entrée payante',
    image: 'https://via.placeholder.com/300',
    coordinate: { latitude: 50.4667, longitude: 4.8667 },
  },
  {
    id: '4',
    title: 'Festival de la Bière',
    description: 'Un festival célébrant les bières locales.',
    startDate: { year: 2023, month: 9, day: 25 },
    startTime: '16:00',
    endTime: '23:00',
    address: 'Place d\'Armes, Namur',
    interestedCount: 200,
    organisateur: 'Brasserie Namur',
    publicInfo: 'Entrée gratuite',
    image: 'https://via.placeholder.com/300',
    coordinate: { latitude: 50.4667, longitude: 4.8667 },
  },
];

function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = today.getFullYear();
  return { day, month, year };
}

const HomeScreen = ({ route }) => {
  const { language } = useContext(LanguageContext);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState(initialEvents);
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      applyFilters(selectedDate);
    }
  }, [isFocused]);

  useEffect(() => {
    if (route.params?.selectedDate) {
      setSelectedDate(route.params.selectedDate);
      applyFilters(route.params.selectedDate);
    }
  }, [route.params]);

  useEffect(() => {
    applyFilters(selectedDate);
  }, []);

  useEffect(() => {
    if (route.params?.newEvent) {
      setAllEvents([...allEvents, route.params.newEvent]);
    }
  }, [route.params]);

  useEffect(() => {
    const getLocation = async () => {
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        Alert.alert(
          language === 'fr' ? 'Permission refusée' : 'Permission Denied',
          language === 'fr' ? 'Désolé, nous avons besoin de l\'autorisation de localisation pour suggérer des adresses.' : 'Sorry, we need location permission to suggest addresses.'
        );
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    };

    getLocation();
  }, [language]);

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const applyFilters = (filters = selectedDate) => {
    const filtered = allEvents.filter(event => {
      const eventDate = new Date(
        `${event.startDate.year}-${event.startDate.month}-${event.startDate.day}`
      );
      const filterDate = new Date(
        `${filters.year}-${filters.month}-${filters.day}`
      );

      return eventDate.getTime() === filterDate.getTime();
    });

    setFilteredEvents(filtered);
    setFilterModalVisible(false);
  };

  const handleMarkerPress = (event) => {
    navigation.navigate('EventDetails', { event, selectedDate });
  };

  const handleDayPress = (selectedDay) => {
    const { dateString } = selectedDay;
    const [year, month, day] = dateString.split('-');
    setSelectedDate({ day, month, year });
  };

  const handleCreateEventPress = () => {
    navigation.navigate('CreateEvent');
  };

  const handleLogoPress = () => {
    navigation.navigate('Friends');
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLogoPress}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.mapContainer}>
          {mapRegion ? (
            <MapView style={styles.map} region={mapRegion}>
              {location && <Marker coordinate={location.coords} title={language === 'fr' ? "Votre position" : "Your location"} pinColor="blue" />}
              {filteredEvents.map(event => (
                <Marker
                  key={event.id}
                  coordinate={event.coordinate}
                  title={event.title}
                  description={event.description}
                  pinColor="red"
                  onPress={() => handleMarkerPress(event)}
                />
              ))}
            </MapView>
          ) : (
            <MapView style={styles.map} />
          )}
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
            <Icon name="filter" size={25} color="#6200EE" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.createEventButton} onPress={handleCreateEventPress}>
            <Icon name="plus" size={25} color="#6200EE" />
          </TouchableOpacity>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Friends')}>
            <View style={styles.iconContainer}>
              <Icon name="users" size={20} color="#808080" />
              <Text style={[styles.menuText, { color: '#808080' }]}>{language === 'fr' ? "Amis" : "Friends"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
            <View style={styles.iconContainer}>
              <Icon name="map" size={25} color="#6200EE" />
              <Text style={[styles.menuText, { color: '#6200EE' }]}>{language === 'fr' ? "Carte" : "Map"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
            <View style={styles.iconContainer}>
              <Icon name="cog" size={20} color="#808080" />
              <Text style={[styles.menuText, { color: '#808080' }]}>{language === 'fr' ? "Para." : "Settings"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFilterModalVisible}
          onRequestClose={toggleFilterModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={toggleFilterModal}>
                <Icon name="times" size={20} color="#6200EE" />
              </TouchableOpacity>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.modalTitle}>{language === 'fr' ? "Filtrer les événements" : "Filter Events"}</Text>
                <Calendar
                  onDayPress={handleDayPress}
                  markedDates={{
                    [`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`]: { selected: true, selectedColor: '#6200EE' },
                  }}
                  minDate={getMinDate()}
                  theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#6200EE',
                    selectedDayBackgroundColor: '#6200EE',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#6200EE',
                    dayTextColor: '#6200EE',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#6200EE',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#6200EE',
                    monthTextColor: '#6200EE',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                  }}
                />
                <Button title={language === 'fr' ? "Appliquer les filtres" : "Apply Filters"} onPress={() => applyFilters(selectedDate)} color="#6200EE" />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginTop: 10,
    alignSelf: 'center',
  },
  mapContainer: {
    flex: 0.9,
    marginHorizontal: '5%',
    marginVertical: '5%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6200EE',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  filterButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  createEventButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  menuItem: {
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  scrollViewContent: {
    padding: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200EE',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#6200EE',
  },
  picker: {
    color: '#6200EE',
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#6200EE',
    borderRadius: 5,
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: '#6200EE',
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default HomeScreen;
