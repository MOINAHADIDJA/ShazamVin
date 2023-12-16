import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { signup } from '../services/signupService';
import axiosInstance from '../axiosConfig';


const SignupScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [nom, setNom] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
           const resp = await axiosInstance.post('api/auth/signup', {
            login,
            nom,
            password
        });
            Alert.alert('Succès', 'Inscription réussie');
            navigation.navigate('Login'); // Navigate to the login screen
        } catch (error) {
            Alert.alert('Erreur', 'Inscription échouée');
        }
    };

    return (
        <View style={styles.container}>
             <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
            <TextInput style={styles.input} placeholder="Login" value={login} onChangeText={setLogin} />
            <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="S'inscrire" onPress={handleSignup} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default SignupScreen;
