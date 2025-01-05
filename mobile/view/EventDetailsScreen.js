import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { LanguageContext } from './LanguageContext';

const EventDetailsScreen = ({ route }) => {
  const { language } = useContext(LanguageContext);
  const { event, selectedDate } = route.params;
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Convertir la date en une chaîne de caractères lisible
  const formatDate = (date) => {
    const monthNames = language === 'fr' ? [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ] : [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[parseInt(date.month) - 1];
    return `${date.day} ${monthName} ${date.year}`;
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now().toString(),
        content: newComment,
        author: 'User Name', // Remplacez par le nom de l'utilisateur actuel
        profilePicture: 'https://via.placeholder.com/150', // Remplacez par l'URL de la photo de profil de l'utilisateur
        date: new Date().toLocaleString(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const handleReportComment = (commentId) => {
    Alert.alert(
      language === 'fr' ? "Signaler un commentaire" : "Report Comment",
      language === 'fr' ? "Voulez-vous vraiment signaler ce commentaire ?" : "Do you really want to report this comment?",
      [
        {
          text: language === 'fr' ? "Annuler" : "Cancel",
          style: "cancel"
        },
        { text: language === 'fr' ? "Signaler" : "Report", onPress: () => {
          // Logique de signalement du commentaire
          console.log(`Comment ${commentId} reported`);
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDate}>{formatDate(event.startDate)} , {event.startTime}</Text>
          <Text style={styles.eventLocation}>{event.address}</Text>
          <Text style={styles.eventTime}>{language === 'fr' ? "Heure: " : "Time: "} {event.startTime} - {event.endTime}</Text>
        </View>
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>{language === 'fr' ? "Détails" : "Details"}</Text>
          <View style={styles.detailItem}>
            <Icon name="users" size={20} color="#6200EE" />
            <Text style={styles.detailText}>{event.interestedCount} {language === 'fr' ? "personnes ont répondu" : "people responded"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="university" size={20} color="#6200EE" />
            <Text style={styles.detailText}>{language === 'fr' ? "Organisateur: " : "Organizer: "} {event.organisateur}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="map-marker" size={20} color="#6200EE" />
            <Text style={styles.detailText}>{event.address}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="globe" size={20} color="#6200EE" />
            <Text style={styles.detailText}>{event.publicInfo}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="user" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>{language === 'fr' ? "Intéressé" : "Interested"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="check" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>{language === 'fr' ? "Participe" : "Participate"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>{language === 'fr' ? "Partager" : "Share"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>{language === 'fr' ? "Commentaires" : "Comments"}</Text>
          {comments.map(comment => (
            <View key={comment.id} style={styles.comment}>
              <Image source={{ uri: comment.profilePicture }} style={styles.profilePicture} />
              <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentDate}>{comment.date}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
              <TouchableOpacity onPress={() => handleReportComment(comment.id)}>
                <Icon name="flag" size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.newCommentSection}>
            <TextInput
              style={styles.newCommentInput}
              placeholder={language === 'fr' ? "Écrire un commentaire..." : "Write a comment..."}
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
              <Icon name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.menuItem}>
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
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Icon name="cog" size={20} color="#808080" />
            <Text style={[styles.menuText, { color: '#808080' }]}>{language === 'fr' ? "Para." : "Settings"}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  eventDetails: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
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
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
    borderTopColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
  commentsSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    marginTop: 5,
    color: '#333',
  },
  newCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  newCommentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  addCommentButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 20,
  },
});

export default EventDetailsScreen;
