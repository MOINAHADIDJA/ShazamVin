import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity,TextInput, FlatList, Button ,Alert,StyleSheet} from 'react-native';
import { fetchCommentsByWine, addComment, updateComment, deleteComment } from '../services/commentService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CommentModal = ({ wineId, userId, userRole, onClose }) => {
  const [comments, setComments] = useState([]);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [currentCommentValue, setCurrentCommentValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // to control the visibility of the modal


useEffect(() => {
  fetchCommentsByWine(wineId)
    .then(response => setComments(response.data))
    .catch(error => {
      console.error("Erreur lors de la récupération des commentaires (front):", error);
      // Afficher une alerte ou un message d'erreur à l'utilisateur
    });
}, [wineId]);

    
  const isUserAuthorized = (commentUserId) => {
    console.log(commentUserId,' ',userId , ' ',userId === commentUserId);
    return (userRole === 'admin' || parseInt(userId) === commentUserId);
  };

  // Fonctions pour gérer les commentaires
  const openEditModal = (comment) => {
    setCurrentCommentId(comment.id);
    setCurrentCommentValue(comment.texte); // Convertir en chaîne pour TextInput
    setModalVisible(true);
  };
  const closeModal = () => {setModalVisible(false);};
  const handleEditComment = () => {
      const updatedCommentData = { texte: currentCommentValue };
      updateComment(currentCommentId, updatedCommentData)
        .then(() => {
          setComments(comments.map(comment => 
            comment.id === currentCommentId ? { ...comment, texte: updatedCommentData.texte } : comment
          ));
          closeModal();
        })
        .catch(err => console.error(err.message));
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId);
      if (response.status === 200) {
        Alert.alert("Succès", "Commentaire supprimé.");
        // Retirez le commentaire supprimé de la liste des commentaires
        setComments(comments.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      Alert.alert("Erreur", "Problème lors de la suppression du commentaire.");
    }
};

  return (
    <Modal  onRequestClose={onClose}>
      <View >
       
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <Text style={{ fontSize: 20  }}>Commentaires</Text>
          {/* <Button title="Ajouter" onPress={() => {/* handle add comment } /> */}
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </TouchableOpacity>

        </View>
        
        {/* Liste des commentaires */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
              <View style={{ padding: 20 , borderBottomWidth:2 }}>
                <View style={{ flexDirection: 'row' , justifyContent :'space-between' }}>
                  <Text style={{ fontSize: 25, marginBottom: 10 }}>{item.user?.nom}</Text>
                  {isUserAuthorized(item.id_user) && (
                    <View style={styles.userActions}>
                      <TouchableOpacity onPress={() => openEditModal(item)}>
                        <MaterialCommunityIcons name="pencil" size={24} color="blue" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
                        <MaterialCommunityIcons name="delete" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
                  )}
              
                </View>
                  
                <Text>{item.texte}</Text>
                      
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
                      placeholder={'Votre commentaire'}
                      value={currentCommentValue}
                      onChangeText={setCurrentCommentValue}
                      style={styles.input}
                    />
                    <Button title="Modifier" onPress={ handleEditComment} />
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
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  authorName: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
   modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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


export default CommentModal;
