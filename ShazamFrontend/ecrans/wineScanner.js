import React, { useState, useEffect,useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Tesseract from 'tesseract.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ScannerScreen = ({ navigation }) => {
    
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const cameraRef = useRef(null);


    useEffect(() => {
        (async () => {
                const { status } = await Camera.requestPermissionsAsync();
                setHasCameraPermission(status === 'granted');

                const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (imagePickerStatus.status !== 'granted') {
                    alert('Permission d\'accès à la bibliothèque média refusée!');
                }
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            setImage(photo);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
        setImage(result);
        }
    };
    const close = () => {
        navigation.navigate('Home')
    }

    const extractTextFromImage = async () => {
        if (image) {
            try {
                const { data: { text } } = await Tesseract.recognize(image.uri, 'eng');
                    // Utilisez le texte extrait comme vous le souhaitez
                console.log('Texte extrait:', text);
            } catch (error) {
                console.error('Erreur lors de l\'extraction du texte', error);
            }
        }
    };

    if (hasCameraPermission === null) {
        return <Text>Demande de permission de caméra en cours</Text>;
    }

    if (hasCameraPermission === false) {
        return <Text>Accès à la caméra refusé</Text>;
    }

  return (
      <View style={styles.container}>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <Text style={{ fontSize: 20 }}>Scanner Vin</Text>
                <TouchableOpacity onPress={close}>
                  <MaterialCommunityIcons name="close" size={24} color="black" />
                </TouchableOpacity>

            </View>
      {image ? (
        <Image source={{ uri: image.uri }} style={styles.imagePreview} />
      ) : (
        <Camera style={styles.camera} ref={cameraRef}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.captureButtonText}>Prendre une photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={pickImage}>
            <Text style={styles.captureButtonText}>Choisir une photo</Text>
          </TouchableOpacity>
        </Camera>
      )}

      <TouchableOpacity
        style={styles.extractTextButton}
        onPress={extractTextFromImage}
        disabled={!image}
      >
        <Text style={styles.extractTextButtonText}>Extraire le texte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    alignSelf: 'center',
    margin: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  captureButtonText: {
    fontSize: 16,
    color: 'black',
  },
  imagePreview: {
    flex: 1,
    resizeMode: 'contain',
  },
  extractTextButton: {
    alignSelf: 'center',
    margin: 20,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    opacity: 0.8,
  },
  extractTextButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ScannerScreen;
