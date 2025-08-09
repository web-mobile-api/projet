import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { LanguageContext } from './LanguageContext';
import { getEventDetails } from '../services/eventDetailsService';


const EventDetailsScreen = ({ route }) => {
  const { language } = useContext(LanguageContext);
  const { eventId } = route.params;
  const navigation = useNavigation();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventDetails(eventId);
        setEvent(data);
        setComments(data.Comment || []);
      } catch (err) {
        Alert.alert(language === 'fr' ? 'Erreur' : 'Error', err?.response?.data?.message || err.message || 'Failed to load event.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, language]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      // This is a placeholder for posting a comment to the API
      const newCommentObj = {
        id: Date.now().toString(),
        content: newComment,
        author: 'User Name',
        profilePicture: 'https://via.placeholder.com/150',
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>{language === 'fr' ? 'Chargement...' : 'Loading...'}</Text>
      </View>
    );
  }
  if (!event) {
    return (
      <View style={styles.container}>
        <Text>{language === 'fr' ? 'Événement introuvable.' : 'Event not found.'}</Text>
      </View>
    );
  }

  // Helper to format date/time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {event.EventPhoto && event.EventPhoto.length > 0 && event.EventPhoto[0].file_name ? (
          <Image source={{ uri: event.EventPhoto[0].file_name }} style={styles.eventImage} />
        ) : null}
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event.name || event.title}</Text>
          <Text style={styles.eventDate}>{formatDateTime(event.date)}</Text>
          <Text style={styles.eventLocation}>{event.Location ? event.Location.address : ''}</Text>
          {/* You can add more event details here as needed */}
        </View>
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>{language === 'fr' ? "Détails" : "Details"}</Text>
          {/* Add more details as needed */}
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
            <View key={comment.comment_id || comment.id} style={styles.comment}>
              <Image source={{ uri: comment.author_profile_picture || 'https://via.placeholder.com/150' }} style={styles.profilePicture} />
              <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{comment.author_name || comment.author || 'User'}</Text>
                <Text style={styles.commentDate}>{formatDateTime(comment.created_at || comment.date)}</Text>
                <Text style={styles.commentText}>{comment.content || comment.text}</Text>
              </View>
              <TouchableOpacity onPress={() => handleReportComment(comment.comment_id || comment.id)}>
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
