// WineCard.js
import React, { useState,useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet,TextInput, TouchableOpacity,Alert,Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteWine } from '../services/wineService';
import { addComment } from '../services/commentService';
import { addNote } from '../services/noteService';
import CommentModal from './commentListModal';
import NoteListModal from './noteListModal';
import AsyncStorage from '@react-native-async-storage/async-storage';



const WineCard = ({ wine, isAdmin, navigation , onRefresh}) => {
    const [expanded, setExpanded] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('');
    const [actionType, setActionType] = useState(''); // to store whether the action is 'comment' or 'note'
    const [inputValue, setInputValue] = useState(''); // to store the input value for comment or note
    const [modalVisible, setModalVisible] = useState(false); // to control the visibility of the modal


    useEffect(() => {
      const fetchUserRole = async () => {
          const role = await AsyncStorage.getItem('userrole');
          setUserRole(role);
          };
          fetchUserRole();
    }, []);
    useEffect(() => {
      const fetchUserId = async () => {
          const id =  await AsyncStorage.getItem('userid');;
          setUserId(id);
          };
          fetchUserId();
    }, []);

    const handleEditWine = () => {
        navigation.navigate('WineForm', { wine });
    };

    const handleDeleteWine = async (wineId) => {
    try {
        const response = await deleteWine(wineId);
        if (response.status === 200) {
            // Gérez la suppression réussie, par exemple en actualisant la liste
            Alert.alert("Succès", "Le vin a été supprimé.");
            onRefresh();
           
        }
    } catch (error) {
        // Gérez les erreurs ici
        Alert.alert("Erreur", "Problème lors de la suppression du vin.");
    }
    };

    const openModal = (type) => {
      setActionType(type);
      setModalVisible(true);
    };

// Function to close the modal and reset values
    const closeModal = () => {
      setModalVisible(false);
      setInputValue('');
      setActionType('');
    };
    const handleSave = () => {
      if (actionType === 'comment') {
        // Call service to add a comment
        addComment({ id_vin: wine.id, texte: inputValue }).then(() => closeModal());
      } else if (actionType === 'note') {
        // Call service to add a note
        console.log(wine.id,' ',inputValue);
        addNote({ id_vin: wine.id, valeur: parseInt(inputValue) }).then(() => closeModal());
      }
    };
    
    
  const openCommentModal = () => setShowCommentModal(true);
  const openNoteModal = () => setShowNoteModal(true);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
            
               <View style={styles.headerContent}>
                <Image source={{ uri: wine.image }} style={styles.petitimage} />
                <Text>{wine.chateau}</Text>
            </View>
                 {/* Icônes d'administration */}
                {isAdmin && (
                    <View style={styles.adminActions}>
                       
                        <TouchableOpacity onPress={() => handleEditWine()}>
                            <MaterialCommunityIcons name="pencil" size={24} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteWine(wine.id)}>
                            <MaterialCommunityIcons name="delete" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>


        <View style={styles.body}>
               
                <Text>couleur: {wine.couleur} </Text>
                <Text>Prix: {wine.prix} euro</Text>
                 <Text>Millesime: {wine.millesime} </Text>
                
                {expanded && (
                    <>
                        <Text>Cépages: {wine.cepages}</Text>
                         <Text>Nom Producteur : {wine.nomProducteur} </Text>
                        <Text>Volume Bouteille: {wine.volumeBouteille} ml</Text>
                        <Text>Region d'Origine: {wine.regionOrigine}</Text>
                        <Text>Pourcentage Alcool: {wine.pourcentageAlcool} ° / %</Text>

                 <Text>presence Sulfites: {wine.presenceSulfites} </Text>
                        <Text>classification Qualite: {wine.classificationQualite} </Text>
                        
                           <Text>Notes de dégustation : {wine.noteDegustation}</Text>
                    <Text>Conseil Conservation: {wine.conseilsConservation} </Text>
                        <Text>infoDistributeur: {wine.infoDistributeur} </Text>
                                      <Image source={{ uri: wine.image }} style={styles.imagegrand} />

                       
                        

                        {/* Autres détails */}
                    </>
                )}
                {/* <Button title={expanded ? 'Moins' : 'Voir plus'} onPress={() => setExpanded(!expanded)} /> */}

        <View style={styles.actionsContainer}>
                        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                          <Text style={styles.actionText}>{expanded ? 'Moins' : 'Voir plus'}</Text>
                        </TouchableOpacity>
                        <View style={styles.rightActions}>
                          <TouchableOpacity onPress={() => openModal("comment")}>
                            <Text style={styles.actionText}>Commenter</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => openModal("note")}>
                            <Text style={styles.actionText}>Noter</Text>
                          </TouchableOpacity>
                        </View>
                      {/* Modal pour le commentaire/la note */}
              <Modal
                visible={modalVisible}
                onRequestClose={closeModal}
                animationType="slide"
                transparent={true}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: 300, height: 150, backgroundColor: 'white', padding: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' ,marginBottom:12}}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                              <MaterialCommunityIcons name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                                        
                    <TextInput
                      placeholder={`Votre ${actionType === 'comment' ? 'commentaire' : 'note entre 1 et 5'} ici`}
                      value={inputValue}
                      onChangeText={setInputValue}
                      style={styles.input }
                    />
                    <Button title="Enregistrer" onPress={handleSave} />
                  </View>
                </View>
              </Modal>
        </View>
                
    </View>

    <View style={styles.footer}>
              <View style={styles.footerItem}>
                  <TouchableOpacity onPress={() => openNoteModal()}>
                    <Text style={styles.footerText}>Notes</Text>
                  </TouchableOpacity>
              </View>
              <View style={[styles.footerItem, styles.footerItemRight]}>
                <TouchableOpacity onPress={() => openCommentModal()}>
                  <Text style={styles.footerText}>Commentaires</Text>
                </TouchableOpacity>
              </View>

                 {/* Modaux pour les commentaires et les notes */}
      {showCommentModal && (
        <CommentModal
            wineId={wine.id}
            userId={userId}
            userRole={userRole}
            // userId et userRole devraient être passés en props
            onClose={() => setShowCommentModal(false)}
        />
      )}
      {showNoteModal && (
        <NoteListModal
            wineId={wine.id}
            userId={userId}
            userRole={userRole}
          onClose={() => setShowNoteModal(false)}
        />
      )} 
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    headerContent: {
        flexDirection: 'row', alignItems: 'center',
    },
    petitimage: { width: 50, height: 50 , margin:10},
    body: { /* Styles pour le corps de la carte */
        margin: 10,
        padding : 5
    },
    //footer: { flexDirection: 'row', justifyContent: 'space-between' },
    expandContainer: {
        alignItems: 'flex-start', // Aligner à droite
        marginBottom: 10, // Marge en bas
        marginRight: 10, // Marge à droite
    },
    expandText: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    footerItem: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    footerItemRight: {
        borderRightWidth: 0,
    },
    footerText: {
        fontWeight: 'bold',
    },
        adminActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // autres styles pour la disposition des icônes
    },
    icon: {
    marginHorizontal: 15, // Adds horizontal margin
   // margin :10,
},
   imagegrand: {
    width: 100,
    height: 100,
    margin: 20,
   flexDirection: 'row', alignItems: 'center'
    },
   actionContainer: {
        flexDirection: 'row',
       // justifyContent: 'space-evenly',
        alignItems : 'end',
        marginTop: 10,
    },
    actionText: {
        color: 'blue',
        margin:10,
    },
     actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  rightActions: {
      flexDirection: 'row',
      
  },
  actionText: {
    color: 'blue',
    marginHorizontal: 10,
  },
  input: {
        height: 40, // Hauteur fixe pour les TextInput
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
  }

});

export default WineCard;
