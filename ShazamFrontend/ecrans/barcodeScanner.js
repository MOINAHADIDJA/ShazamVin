import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { searchWines } from '../services/wineService';

const BarcodeScanner = ({navigation}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState('');
  const [wines, setWines] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

 

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeData(data);
    alert(`Code barre scanné !\nType: ${type}\nDonnées: ${data}`);

  };
  const close = () => {
      navigation.navigate('Home')
  }

  if (hasCameraPermission === null) {
    return <Text>Demande d'autorisation de la caméra en cours...</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>Accès à la caméra refusé</Text>;
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <Text style={{ fontSize: 20 }}>Scanner Code Barre</Text>
                <TouchableOpacity onPress={close}>
                  <MaterialCommunityIcons name="close" size={24} color="black" />
                </TouchableOpacity>

      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={{
            backgroundColor: '#3498db',
            padding: 15,
            margin: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Scanner à nouveau</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BarcodeScanner;
