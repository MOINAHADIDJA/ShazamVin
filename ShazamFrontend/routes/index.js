import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabs from '../ecrans/tabs';
import Login from '../ecrans/login';
import SignupScreen from '../ecrans/signup';
import WineListScreen from '../ecrans/wineList';
import WineFormScreen from '../ecrans/wineForm';
import ScannerScreen from '../ecrans/wineScanner';
import BarcodeScanner from '../ecrans/barcodeScanner';

const Routes = () => {
    const Stack = createNativeStackNavigator();
    const [isSignedIn, setIsSignedIn] = useState(false);

    // useEffect(() => {
    //     const checkToken =  () => {
    //         try {
    //             const token =  AsyncStorage.getItem('userToken');
    //             if (token !== null) {
    //                 console.log(token);
    //                 console.log("token trouvé 1");
    //                 setIsSignedIn(true);
    //                 console.log("token trouvé 2");
    //                 console.log(isSignedIn);
    //             }
    //         } catch (error) {
    //             console.error('Erreur lors de la vérification du token', error);
    //         }
    //     };

    //     checkToken();
    // }, []);

    const checkToken = () => {
    AsyncStorage.getItem('userToken')
        .then(token => {
            if (token !== null) {
                console.log("token trouvé 1");
                setIsSignedIn(true);
                console.log("token trouvé 2");
            }
        })
        .catch(error => {
            console.error('Erreur lors de la vérification du token', error);
        });
};

useEffect(() => {
    checkToken();
}, []);

    //  // Ajoutez cette condition de rendu pour attendre la vérification du token
    // if (isSignedIn === null) {
    //     return null; // Ou un écran de chargement si nécessaire
    // }

    // return (
    //     <NavigationContainer>
    //         <Stack.Navigator screenOptions={{ headerShown: false }}>
    //             {!isSignedIn ? (
    //                 <Stack.Screen name="Login" component={Login} />
    //             ) : (
    //                 <Stack.Screen name="Home" component={BottomTabs} />
    //             )}
    //                 <Stack.Screen name="Signup" component={SignupScreen} />
    //         </Stack.Navigator>
    //     </NavigationContainer>
    // );
    return (
        <NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }}>

                {/* {isSignedIn ? (
       // Auth screens */}
    <Stack.Group >
      <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name='WineForm' component={WineFormScreen}/>
            </Stack.Group>
   
   
  {/* ) : (
    // Screens for logged in users */}
             <Stack.Group>
                <Stack.Screen name="Home" component={BottomTabs} />
                <Stack.Screen name="WineList" component={WineListScreen} />
                <Stack.Screen name="Scann" component={ScannerScreen} />
                <Stack.Screen name="ScannCodeBarrre" component={BarcodeScanner} />   

      {/* <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Group>
    {/* )} */}
    </Stack.Navigator>
   </NavigationContainer>

);


};

export default Routes;







