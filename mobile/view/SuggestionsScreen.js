import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { LanguageContext } from './LanguageContext';

const SuggestionsScreen = () => {
  const { language } = useContext(LanguageContext);
  const navigation = useNavigation();

  const [suggestions, setSuggestions] = useState([
    { id: 1, name: 'Charlie Davis', avatar: require('./assets/avatar5.png'), mutualFriends: 7 },
    { id: 2, name: 'Diana Evans', avatar: require('./assets/avatar6.png'), mutualFriends: 2 },
  ]);

  const [friends, setFriends] = useState([]);

  const handleAddFriend = (id) => {
    const friendToAdd = suggestions.find(suggestion => suggestion.id === id);
    setFriends([...friends, friendToAdd]);
    const updatedSuggestions = suggestions.filter(suggestion => suggestion.id !== id);
    setSuggestions(updatedSuggestions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.headerButton, styles.inactiveTab]} onPress={() => navigation.navigate('Invitations')}>
          <Text style={styles.headerText}>{language === 'fr' ? "Invitations" : "Invitations"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, styles.activeTab]} onPress={() => navigation.navigate('Suggestions')}>
          <Text style={styles.headerText}>{language === 'fr' ? "Suggestions" : "Suggestions"}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.suggestionsList}>
        {suggestions.map(suggestion => (
          <View key={suggestion.id} style={styles.suggestionItem}>
            <Image source={suggestion.avatar} style={styles.avatar} />
            <View style={styles.suggestionDetails}>
              <Text style={styles.suggestionName}>{suggestion.name}</Text>
              <Text style={styles.mutualFriends}>{suggestion.mutualFriends} {language === 'fr' ? "ami(e)s en commun" : "mutual friends"}</Text>
            </View>
            <TouchableOpacity onPress={() => handleAddFriend(suggestion.id)} style={styles.addButton}>
              <Text style={styles.buttonText}>{language === 'fr' ? "Ajouter" : "Add"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Friends')}>
          <View style={styles.iconContainer}>
            <Icon name="users" size={25} color="#6200EE" />
            <Text style={[styles.menuText, { color: '#6200EE' }]}>{language === 'fr' ? "Amis" : "Friends"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <View style={styles.iconContainer}>
            <Icon name="map" size={20} color="#808080" />
            <Text style={[styles.menuText, { color: '#808080' }]}>{language === 'fr' ? "Carte" : "Map"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  headerButton: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderBottomColor: '#6200EE',
  },
  inactiveTab: {
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
  },
  suggestionsList: {
    flex: 1,
    padding: 15,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  suggestionDetails: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mutualFriends: {
    fontSize: 14,
    color: '#808080',
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
    fontSize: 12,
  },
});

export default SuggestionsScreen;

