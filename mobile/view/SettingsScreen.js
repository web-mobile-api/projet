import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LanguageContext } from './LanguageContext';

const SettingsScreen = () => {
  const { language } = useContext(LanguageContext);
  const navigation = useNavigation();
  const [faqVisible, setFaqVisible] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
  });

  const handleLogout = () => {
    // Naviguer vers la page de login
    navigation.navigate('Login');
  };

  const toggleFaq = (question) => {
    setFaqVisible((prevState) => ({
      ...prevState,
      [question]: !prevState[question],
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{language === 'fr' ? "Paramètres" : "Settings"}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.description}>
            {language === 'fr' ?
              "Bienvenue sur T-Event, l'application qui transforme votre téléphone en radar à fêtes ! Grâce à la géolocalisation, trouvez les événements les plus cools près de vous, que ce soit des concerts, des festivals ou des soirées thématiques. Plus besoin de chercher, T-Event s'en charge !" :
              "Welcome to T-Event, the app that turns your phone into a party radar! With geolocation, find the coolest events near you, whether it's concerts, festivals, or themed parties. No more searching, T-Event takes care of it!"
            }
          </Text>
          <Text style={styles.description}>
            {language === 'fr' ?
              "Avec une interface super simple, filtrez les événements par date pour trouver exactement ce que vous cherchez. Et cerise sur le gâteau, partagez vos trouvailles avec vos amis et montrez leur auxquelles vous allez participer pour qu'ils puissent vous surprendre par leur présence a ceux-ci !" :
              "With a super simple interface, filter events by date to find exactly what you're looking for. And the cherry on top, share your findings with your friends and show them which ones you're going to so they can surprise you with their presence!"
            }
          </Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>{language === 'fr' ? "Questions Fréquentes" : "Frequently Asked Questions"}</Text>
        </View>
        <View style={styles.faqContent}>
          <View style={styles.faqContainer}>
            <TouchableOpacity onPress={() => toggleFaq('q1')}>
              <Text style={styles.faqQuestion}>{language === 'fr' ? "Comment puis-je trouver des événements près de moi ?" : "How can I find events near me?"}</Text>
            </TouchableOpacity>
            {faqVisible.q1 && (
              <Text style={styles.faqAnswer}>
                {language === 'fr' ?
                  "Activez la géolocalisation et laissez T-Event faire le reste ! Ouvrez l'application et observer les balises autour de vous pour voir la fête la plus proche." :
                  "Enable geolocation and let T-Event do the rest! Open the app and look at the markers around you to see the nearest parties."
                }
              </Text>
            )}
          </View>
          <View style={styles.faqContainer}>
            <TouchableOpacity onPress={() => toggleFaq('q2')}>
              <Text style={styles.faqQuestion}>{language === 'fr' ? "Puis-je filtrer les événements par date ?" : "Can I filter events by date?"}</Text>
            </TouchableOpacity>
            {faqVisible.q2 && (
              <Text style={styles.faqAnswer}>
                {language === 'fr' ?
                  "Oui, utilisez les filtres dans la barre de recherche pour trouver l'événement parfait pour vous et votre emploi du temps chargé!" :
                  "Yes, use the filters in the search bar to find the perfect event for you and your busy schedule!"
                }
              </Text>
            )}
          </View>
          <View style={styles.faqContainer}>
            <TouchableOpacity onPress={() => toggleFaq('q3')}>
              <Text style={styles.faqQuestion}>{language === 'fr' ? "Comment puis-je obtenir plus d'informations sur un événement spécifique ?" : "How can I get more information about a specific event?"}</Text>
            </TouchableOpacity>
            {faqVisible.q3 && (
              <Text style={styles.faqAnswer}>
                {language === 'fr' ?
                  "Cliquez sur l'événement pour voir tous les détails : horaires, lieu, et même des avis d'autres utilisateurs !" :
                  "Click on the event to see all the details: times, location, and even reviews from other users!"
                }
              </Text>
            )}
          </View>
          <View style={styles.faqContainer}>
            <TouchableOpacity onPress={() => toggleFaq('q4')}>
              <Text style={styles.faqQuestion}>{language === 'fr' ? "Puis-je partager des événements avec mes amis ?" : "Can I share events with my friends?"}</Text>
            </TouchableOpacity>
            {faqVisible.q4 && (
              <Text style={styles.faqAnswer}>
                {language === 'fr' ?
                  "Bien sûr ! Partagez directement depuis l'application et faites la fête ensemble jusqu'a pas d'heures !" :
                  "Of course! Share directly from the app and party together until the wee hours!"
                }
              </Text>
            )}
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>{language === 'fr' ? "Nous Contacter" : "Contact Us"}</Text>
        </View>
        <View style={styles.contactContent}>
          <Text style={styles.contactInfo}>
            {language === 'fr' ? "Adresse : 123 Rue des Fêtes, 5000 Namur, Belgique" : "Address: 123 Party Street, 5000 Namur, Belgium"}
          </Text>
          <Text style={styles.contactInfo}>
            {language === 'fr' ? "Téléphone : +32 1 23 45 67 89" : "Phone: +32 1 23 45 67 89"}
          </Text>
          <Text style={styles.contactInfo}>
            {language === 'fr' ? "Email : contact@t-event.com" : "Email: contact@t-event.com"}
          </Text>
          <Text style={styles.contactInfo}>
            {language === 'fr' ? "Horaires : Lun-Ven, 9h-18h" : "Hours: Mon-Fri, 9am-6pm"}
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>{language === 'fr' ? "Déconnexion" : "Logout"}</Text>
        </TouchableOpacity>

        {/* Espace pour éviter que le bouton de déconnexion soit caché par la barre de navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Friends')}>
          <View style={styles.iconContainer}>
            <Icon name="users" size={20} color="#808080" />
            <Text style={[styles.menuText, { color: '#808080' }]}>{language === 'fr' ? "Amis" : "Friends"}</Text>
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
            <Icon name="cog" size={25} color="#6200EE" />
            <Text style={[styles.menuText, { color: '#6200EE' }]}>{language === 'fr' ? "Para." : "Settings"}</Text>
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
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 20,
  },
  faqContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  faqContainer: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 5,
  },
  faqAnswer: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 10,
  },
  contactContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  contactInfo: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
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
  bottomSpacer: {
    height: 60, // Ajustez cette valeur en fonction de la hauteur de votre barre de navigation
  },
});

export default SettingsScreen;
