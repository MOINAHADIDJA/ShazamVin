import React, {useState} from 'react';
import {View, Text,  Modal, StyleSheet, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './home';
import Wines from './wineList';
import WineListScreen from './wineList';


const BottomTabs = () => {

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = async () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
    setLogoutModalVisible(false);
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const Tab = createBottomTabNavigator();
  return (

<React.Fragment>

    <Tab.Navigator
      initialRouteName="Accueil"
    

      screenOptions={{
        tabBarActiveTintColor: '#007bff', // Changer la couleur ici
        tabBarInactiveTintColor: 'black', // Couleur inactive
        tabBarStyle: { height: 60 }, // Augmenter la hauteur du Tab Bar
        tabBarLabelStyle: { fontSize: 16 }, // Ajuster la taille du texte
        tabBarIconStyle: { fontSize: 24 }, // Ajuster la taille de l'icône
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Liste des Vins"
        component={WineListScreen}
        options={{
          tabBarLabel: 'Wine',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="glass-wine" color={color} size={size} />
          ),
          //tabBarBadge : 2,
        }}
      />

      <Tab.Screen
        name="deconnexion"
        component={() => null}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Empêcher la navigation par défaut vers l'écran de déconnexion
            e.preventDefault();
            // Afficher la boîte de dialogue de confirmation
            handleLogout();
          },
        })}
        options={{
          tabBarLabel: 'Deconnexion',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
          }}
          
        />
         </Tab.Navigator>
 <Modal
        transparent={true}
        visible={isLogoutModalVisible}
        animationType="slide"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Êtes-vous sûr de vouloir vous déconnecter ?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={confirmLogout}
                >
                  <Text style={styles.buttonText}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={cancelLogout}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
    backgroundColor: 'blue',
    width : 100
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  cancelButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#007bff',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default BottomTabs;