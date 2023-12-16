import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert,ScrollView,Picker,TouchableOpacity } from 'react-native';
import { addWine, updateWine } from '../services/wineService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const WineFormScreen = ({ navigation, route }) => {
    const [iduser, setIduser] = useState();
    
    useEffect(() => {
    const fetchUserId = async () => {
        const id =  await AsyncStorage.getItem('userid');;
        setIduser(id);
        };
        fetchUserId();
    }, []);

    // État initial pour le vin
    const initialWineState = {
        appelation:'',
        nomProducteur: '',
        regionOrigine: '',
        couleur: '',
        chateau: '',
        prix: '',
        cepages: '',
        millesime: '',
        pourcentageAlcool: '',
        volumeBouteille: '',
        notesDegustation: '',
        presenceSulfites: '',
        classificationQualite: '',
        conseilsConservation: '',
        infoDistributeur: '',
        image: '',
        creatorId:iduser,
    };

    // const handleAddWine = async () => {
    //     try {
    //         await addWine(wineData);
    //         Alert.alert('Succès', 'Vin ajouté avec succès');
    //         // Redirection vers l'écran de la liste des vins
    //     navigation.navigate('WineListScreen');
    //     } catch (error) {
    //         Alert.alert('Erreur', 'Problème lors de l\'ajout du vin');
    //     }
    // };
  
    const [wineData, setWineData] = useState(initialWineState);
    const [isEditMode, setIsEditMode] = useState(false);

    // Détecter si on est en mode modification
    useEffect(() => {
        if (route.params && route.params.wine) {
            setWineData(route.params.wine);
            setIsEditMode(true);
        }
    }, [route.params]);

    const handleSaveWine = async () => {
        try {
            if (isEditMode) {
                await updateWine(wineData.id,wineData);
                Alert.alert('Succès', 'Vin modifié avec succès');
            } else {
                await addWine(wineData);
                Alert.alert('Succès', 'Vin ajouté avec succès');
            }
            navigation.navigate('Liste des Vins');
        } catch (error) {
            Alert.alert('Erreur', 'Problème lors de la sauvegarde du vin');
        }
    };
    const close = () => {
        navigation.navigate('Home')
    }


    return (

       <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <Text style={{ fontSize: 20 }}>Ajouter Vin</Text>
                  {/* <Button title="Ajouter" onPress={() => {/* handle add note } /> */}
                <TouchableOpacity onPress={close}>
                  <MaterialCommunityIcons name="close" size={24} color="black" />
                  </TouchableOpacity>

        </View>
        <ScrollView contentContainerStyle={styles.container}>

                <TextInput
                    style={styles.input}
                    placeholder="Appelation"
                    value={wineData.appelation}
                    onChangeText={(text) => setWineData({ ...wineData, appelation : text})}
                />
           
               <TextInput
                style={styles.input}
                placeholder="Nom du Producteur"
                value={wineData.nomProducteur}
                onChangeText={(text) => setWineData({ ...wineData, nomProducteur: text })}
            />

      
            <View style={styles.row}>
               <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={wineData.couleur}
                        onValueChange={(itemValue, itemIndex) =>
                            setWineData({ ...wineData, couleur: itemValue })
                        }>
                        <Picker.Item label="choisis la couleur " value="" />
                        <Picker.Item label="Rouge" value="rouge" />
                        <Picker.Item label="Blanc" value="blanc" />
                        <Picker.Item label="Rosé" value="rose" />
                        
                    </Picker>
                </View>
                <TextInput
                    style={[styles.input, styles.flex1]}
                    placeholder="Prix"
                   
                    value={wineData.prix.toString()}
                    onChangeText={(text) => setWineData({ ...wineData, prix: parseFloat(text) })}
                />
                 <TextInput
                style={styles.input}
                placeholder="pourcentage Alcool en ° ou en % "
                value={wineData.pourcentageAlcool}
                onChangeText={(text) => setWineData({ ...wineData, pourcentageAlcool: parseFloat(text) })}
            />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Cépage"
                value={wineData.cepages}
                onChangeText={(text) => setWineData({ ...wineData, cepages: text })}
                multiline="true"
            />
            <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder="Région d'Origine"
                value={wineData.regionOrigine}
                onChangeText={(text) => setWineData({ ...wineData, regionOrigine: text })}
                />

                <TextInput
                style={styles.input}
                placeholder="Millésime"
                value={wineData.millesime}
                onChangeText={(text) => setWineData({ ...wineData, millesime: parseInt(text) })}
                />
                 <TextInput
                style={styles.input}
                placeholder="Volume Bouteille en ml"
                value={wineData.volumeBouteille}
                onChangeText={(text) => setWineData({ ...wineData, volumeBouteille: parseFloat(text)})}
                />
                
                <View style={styles.pickerContainer}>
    <Picker
        selectedValue={wineData.presenceSulfites}
        onValueChange={(itemValue, itemIndex) =>
            setWineData({ ...wineData, presenceSulfites: itemValue })
        }>
        <Picker.Item label="Presence sulfites" value="" default/>
        <Picker.Item label="Oui" value="true" />
        <Picker.Item label="Non" value="false" />
       
    </Picker>
</View>
            </View>
             
               <TextInput
                style={styles.input}
                placeholder="Chateau"
                value={wineData.chateau}
                onChangeText={(text) => setWineData({ ...wineData, chateau: text })}
            />
              <TextInput
                style={styles.input}
                placeholder="Info Distributeur"
                value={wineData.infoDistributeur}
                onChangeText={(text) => setWineData({ ...wineData, infoDistributeur: text })}
                multiline="true"
            />
              <TextInput
                style={styles.input}
                placeholder="Notes Degustation"
                value={wineData.notesDegustation}
                onChangeText={(text) => setWineData({ ...wineData, notesDegustation: text })}
                multiline="true"
            />

            <TextInput
                style={styles.input}
                placeholder="Conseils Conservation"
                value={wineData.conseilsConservation}
                onChangeText={(text) => setWineData({ ...wineData, conseilsConservation: text })}
                multiline="true"
            />
              <TextInput
                style={styles.input}
                placeholder="Classification Qualité"
                value={wineData.classificationQualite}
                onChangeText={(text) => setWineData({ ...wineData, classificationQualite: text })}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Photo"
                value={wineData.image}
                onChangeText={(text) => setWineData({ ...wineData, image: text })}
                />
               
            
          
            {/* <Button title="Ajouter le vin" onPress={handleAddWine} /> */}
            <Button title={isEditMode ? 'Modifier le vin' : 'Ajouter le vin'} onPress={handleSaveWine} />

            </ScrollView>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    
     input: {
        flex: 1, // Prend 1/3 de l'espace disponible
        height: 40, // Hauteur fixe pour les TextInput
        marginHorizontal: 5,
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', // Aligner les éléments verticalement
    },
    flex1: {
        flex: 1,
        marginHorizontal: 5,
    },
     pickerContainer: {
        flex: 1, // Prend 1/3 de l'espace disponible
        height: 40, // Hauteur fixe pour le picker
         marginHorizontal: 5,
        height: "fit-content",

    },
});

export default WineFormScreen;
