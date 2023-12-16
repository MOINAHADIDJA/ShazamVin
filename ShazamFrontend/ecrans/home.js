import React,  {useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({ navigation }) => {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Récupérer le token depuis AsyncStorage
        const token = await AsyncStorage.getItem('userToken');
        console.log(token);
        setUserRole( await AsyncStorage.getItem('userrole'));
        //console.log(userRole);
        setUserToken(token);
      } catch (error) {
        console.error('Erreur lors de la récupération du token :', error);
      }
    };

    // Appeler la fonction de récupération du token
    fetchToken();
  }, []);

    // Utilisez un autre useEffect pour observer les changements dans userRole
  useEffect(() => {
    console.log(userRole);
  }, [userRole]); // Exécuter lorsque userRole change

    
  const handleOptionPress = (option) => {
    switch (option) {
      case 'scanner': 
        // Naviguer vers l'écran de scan 
        navigation.navigate("Scann");      
        break;
      case 'consulterVins':
        // Naviguer vers l'écran de consultation des vins 
        navigation.navigate("Liste des Vins");
        break;
      case 'ajouterVin':
        // Naviguer vers l'écran d'ajout de vin 
        navigation.navigate("WineForm");
        break;
      case 'scanncodebarre':
        // Naviguer vers l'écran de consultation des utilisateurs 
        navigation.navigate("ScannCodeBarrre");
        break;
      default:
        break;
    }
    };
    

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => handleOptionPress('scanner')}
      >
        <Text style={styles.optionText}>Scanner étiquette </Text>
      </TouchableOpacity>

       <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionPress('scanncodebarre')}
          >
            <Text style={styles.optionText}>Scanner code barre</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => handleOptionPress('consulterVins')}
      >
        <Text style={styles.optionText}>Consulter Vins</Text>
      </TouchableOpacity>

      {/* Afficher les options pour l'admin */}
      
      {(userRole === 'admin') && (
        <>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionPress('ajouterVin')}
          >
            <Text style={styles.optionText}>Ajouter Vin </Text>
          </TouchableOpacity>

        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Home;
