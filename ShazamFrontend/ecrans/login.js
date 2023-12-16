import  React, {useState,useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { loginService } from '../services/loginService';
import axiosInstance from '../axiosConfig';


const Login = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
     const [isSignedIn, setIsSignedIn] = useState(false);
    const [isComponentMounted, setIsComponentMounted] = useState(true);


useEffect(() => {
        return () => {
            // Le composant est démonté, mettre à jour l'état correspondant
            setIsComponentMounted(false);
        };
}, []);
    
    const handleLogin = async () => {
        try {
            console.log(login,password);
            const data = await axiosInstance.post('api/auth/login', {
            login,
            password
        });
            console.log(data);
            console.log(data.data.token, " ", data.data.userId, " ", data.data.userRole);
            if (data) {
                await AsyncStorage.setItem('userToken', data.data.token);
                await AsyncStorage.setItem('userrole', data.data.userRole);
                await AsyncStorage.setItem('userid', data.data.userId);
                 // Assurez-vous que le composant est toujours monté avant de mettre à jour l'état
                if (isComponentMounted) {
                    setIsSignedIn(true); // Mettre à jour l'état d'authentification
                    navigation.navigate("Home"); // Naviguation vers l'écran d'accueil
                }
            }
        } catch (error) {
            Alert.alert('Erreur', 'Authentification échouée');
        }
    };



    return (
        
        <View style={styles.container}>
           
            <TextInput
                style={styles.input}
                placeholder="Identifiant de connexion"
                value={login}
                onChangeText={setLogin}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Connexion" onPress={handleLogin} />
            <Text onPress={() => navigation.navigate('Signup')} style={{marginTop:15}}>
                Pas de compte | Inscrivez-vous
                </Text>
             
            </View>
            
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 10, borderWidth: 2, borderRadius: 5,
       
    },
    input: {
        width: '70%',
        padding: 10,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default Login;
