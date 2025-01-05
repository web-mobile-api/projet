import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button, ScrollView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider as PaperProvider } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import * as Location from 'expo-location';
import { LanguageContext } from './LanguageContext';
import { EventController } from '../controller/eventController';

function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = today.getFullYear();
  return { day, month, year };
}

const HomeScreen = async ({ route }) => {
  const { language } = useContext(LanguageContext);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleEvents = async () => {
    const fetchEvents = () => {
      EventController.getAllEvents().then((events) => {;
      setAllEvents(events);
      })
      .catch((error) => {
        setError('Failed to fetch events. Please try again later.');
      });
    };

    fetchEvents();
  }

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
        `${event.date.year}-${event.date.month}-${event.date.day}`
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

  const handleRecenterPress = () => {
    console.log('Recenter button pressed');
    if (location) {
      console.log('Location:', location.coords);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    } else {
      console.log('Location is not available');
    }
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
        <View style={styles.mapContainer} onfocus={handleEvents}>
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
          <TouchableOpacity style={styles.recenterButton} onPress={handleRecenterPress}>
            <Icon name="crosshairs" size={25} color="#6200EE" />
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
  recenterButton: {
    position: 'absolute',
    top: 20,
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
