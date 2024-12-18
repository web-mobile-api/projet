import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const FriendsScreen = () => {
  const navigation = useNavigation();

  const [friends, setFriends] = useState([
    { id: 1, name: 'Alice Johnson', avatar: require('./assets/avatar1.png'), mutualFriends: 5 },
    { id: 2, name: 'Bob Brown', avatar: require('./assets/avatar2.png'), mutualFriends: 3 },
    // Add more friends here
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsMenuVisible(false); // Hide the menu bar when the keyboard is visible
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsMenuVisible(true); // Show the menu bar when the keyboard is hidden
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [friends]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = friends.filter(friend =>
      friend.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFriends(filtered);
  };

  const handleDeleteFriend = (id) => {
    Alert.alert(
      'Supprimer l\'ami',
      'Êtes-vous sûr de vouloir supprimer cet ami ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            const updatedFriends = friends.filter(friend => friend.id !== id);
            setFriends(updatedFriends);
            setFilteredFriends(updatedFriends);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleLogoPress = () => {
    navigation.navigate('Home'); // Ensure this line is correct
  };

  const handleInvitationsPress = () => {
    navigation.navigate('Invitations'); // Navigate to the Invitations screen
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLogoPress}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#808080" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Rechercher un ami"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <ScrollView style={styles.friendsList}>
          {filteredFriends.map(friend => (
            <View key={friend.id} style={styles.friendItem}>
              <Image source={friend.avatar} style={styles.avatar} />
              <View style={styles.friendDetails}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.mutualFriends}>{friend.mutualFriends} ami(e)s en commun</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteFriend(friend.id)} style={styles.deleteButton}>
                <Icon name="trash" size={20} color="#808080" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {isMenuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Friends')}>
              <View style={styles.iconContainer}>
                <Icon name="users" size={20} color="#6200EE" />
                <Text style={[styles.menuText, { color: '#6200EE' }]}>Amis</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
              <View style={styles.iconContainer}>
                <Icon name="map" size={25} color="#808080" />
                <Text style={[styles.menuText, { color: '#808080' }]}>Carte</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
              <View style={styles.iconContainer}>
                <Icon name="cog" size={20} color="#808080" />
                <Text style={[styles.menuText, { color: '#808080' }]}>Para.</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.invitationsButton} onPress={handleInvitationsPress}>
          <Icon name="user-plus" size={25} color="#fff" />
        </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  friendsList: {
    flex: 1,
    padding: 10,
  },
  friendItem: {
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
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mutualFriends: {
    fontSize: 14,
    color: '#808080',
  },
  deleteButton: {
    padding: 10,
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
  invitationsButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#6200EE',
    borderRadius: 50,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default FriendsScreen;
