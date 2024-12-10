import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const EventDetailsScreen = ({ route }) => {
  const { event, selectedDate } = route.params;
  const navigation = useNavigation();

  // Convertir la date en une chaîne de caractères lisible
  const formatDate = (date) => {
    const monthNames = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const monthName = monthNames[parseInt(date.month) - 1];
    return `${date.day} ${monthName} ${date.year}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDate}>{formatDate(event.date)} , {event.timeSlot}</Text>
          <Text style={styles.eventLocation}>{event.locationDetails}</Text>
          <Text style={styles.eventTime}>Heure: {event.heure}</Text>
        </View>
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Détails</Text>
          <View style={styles.detailItem}>
            <Icon name="users" size={20} color="#6200EE" />
            <Text style={styles.detailText}>{event.interestedCount} personnes ont répondu</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="university" size={20} color="#6200EE" />
            <Text style={styles.detailText}>Organisateur: {event.organisateur}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="map-marker" size={20} color="#6200EE" />
            <Text style={styles.detailText}>{event.locationDetails}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="globe" size={20} color="#6200EE" />
            <Text style={styles.detailText}>{event.publicInfo}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="user" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Intéressé</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="check" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Participe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Partager</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Icon name="users" size={20} color="#808080" />
            <Text style={[styles.menuText, { color: '#808080' }]}>Amis</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <View style={styles.iconContainer}>
            <Icon name="map" size={25} color="#6200EE" />
            <Text style={[styles.menuText, { color: '#6200EE' }]}>Carte</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Icon name="cog" size={20} color="#808080" />
            <Text style={[styles.menuText, { color: '#808080' }]}>Para.</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 60, // Ajoutez un padding pour éviter que le contenu soit caché par la barre de menu
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  eventDetails: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  eventLocation: {
    fontSize: 16,
    color: '#666',
  },
  eventTime: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  detailsSection: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
  },
  bottomBar: {
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
});

export default EventDetailsScreen;
