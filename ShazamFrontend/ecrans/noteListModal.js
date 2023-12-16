import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, TextInput,Alert,Button, StyleSheet} from 'react-native';
import { fetchNotesByWine, addNote, updateNote, deleteNote } from '../services/noteService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NoteListModal = ({ wineId, userId, userRole, onClose }) => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // to control the visibility of the modal
  const [noteData, setNoteData] = useState(''); // to store the input value for comment or note
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentNoteValue, setCurrentNoteValue] = useState('');


  useEffect(() => {
    console.log("note modal");
    fetchNotesByWine(wineId)
      .then(response => {
        console.log("log note");
        setNotes(response.data)
      })
      .catch(error => {
          console.error("Erreur lors de la récupération des notes (front): ", error);
      })
   
  }, [wineId]);

    
  const isUserAuthorized = (noteUserId) => {
    return userRole === 'admin' || parseInt(userId)  === noteUserId;
  };
  const openEditModal = (note) => {
    setCurrentNoteId(note.id);
    setCurrentNoteValue(note.valeur.toString()); // Convertir en chaîne pour TextInput
    setModalVisible(true);
  };
  const closeModal = () => {setModalVisible(false);};
  const handleEditNote = () => {
  const updatedNoteData = { valeur: parseInt(currentNoteValue) };
  updateNote(currentNoteId, updatedNoteData)
    .then(() => {
      setNotes(notes.map(note => 
        note.id === currentNoteId ? { ...note, valeur: updatedNoteData.valeur } : note
      ));
      closeModal();
    })
    .catch(err => console.error(err.message));
};

  // Fonctions pour gérer les notess
  const handleDeleteNote = async (noteId) => {
    try {
      const response = await deleteNote(noteId);
      if (response.status === 200) {
        Alert.alert("Succès", "Notea supprimé.");
        // Retirez le notes supprimé de la liste des notess
        setNotes(notes.filter(note => note.id !== noteId));
      }
    } catch (error) {
      Alert.alert("Erreur", "Problème lors de la suppression de la note.");
    }
  };

  return (
    <Modal  onRequestClose={onClose}>
      <View>
        {/* Entête avec bouton d'ajout */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <Text style={{ fontSize: 20 }}>Notes</Text>
                  {/* <Button title="Ajouter" onPress={() => {/* handle add note } /> */}
                  <TouchableOpacity onPress={onClose}>
                  <MaterialCommunityIcons name="close" size={24} color="black" />
                  </TouchableOpacity>

        </View>
        
        {/* Liste des notess */}
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
              <View style={{ padding: 10 , borderBottomWidth:2}}>
                <View style={{ flexDirection: 'row' , justifyContent :'space-between' }}>
                  <Text>{item.user?.nom}</Text>
                  {isUserAuthorized(item.id_user) && (
                  <View style={styles.userActions}>
                    <TouchableOpacity onPress={() => openEditModal(item)}>
                      <MaterialCommunityIcons name="pencil" size={24} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                      <MaterialCommunityIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                )}
                </View>
                <Text>{item.valeur}</Text> 
               
              <Modal
                visible={modalVisible}
                onRequestClose={closeModal}
                animationType="slide"
                transparent={true}
                
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.card}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' ,marginBottom:12}}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                              <MaterialCommunityIcons name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                                        
                    <TextInput
                      placeholder={'Votre note entre 1 et 5'}
                      value={currentNoteValue}
                      onChangeText={setCurrentNoteValue}
                      style={styles.input}
                    />
                    <Button title="Modifier" onPress={ handleEditNote} />
                  </View>
                </View>
              </Modal>
                
                
             
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  userActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  noteContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  authorName: {
    fontWeight: 'bold',
  },
  noteText: {
    marginTop: 5,
  },
  input: {
        height: 40, // Hauteur fixe pour les TextInput
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
  },
  card: {
    margin: 10, padding: 10, borderWidth: 1, borderRadius: 5,
     width: 300, height: 150, backgroundColor: 'white', 
  },
});


export default NoteListModal;
