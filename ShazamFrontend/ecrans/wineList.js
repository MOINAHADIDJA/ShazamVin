import React, { useEffect, useState } from 'react';
import { View, FlatList,ScrollView } from 'react-native';
import { fetchWines } from '../services/wineService';
import WineCard from './winecard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WineListScreen = ({ navigation }) => {
    const [wines, setWines] = useState([]);
    const [userRole, setUserRole] = useState('');

     const refreshWines = async () => {
        const fetchedWines = await fetchWines();
        setWines(fetchedWines);
    };

    useEffect(() => {
    const fetchUserRole = async () => {
        const role = await AsyncStorage.getItem('userrole');
        setUserRole(role);
    };

    fetchUserRole();
    }, []);


    useEffect(() => {
        console.log(99999);
        const loadWines = async () => {
            console.log("avant ");
            const fetchedWines = await fetchWines();
            console.log("apres");
            setWines(fetchedWines);
            console.log("apres apres");
        };

        loadWines();
    }, []);

    return (
        <ScrollView>
            <FlatList
                data={wines}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <WineCard
                    wine={item} 
                    isAdmin={userRole === 'admin'}
                    navigation={navigation} // Ajout de la prop navigation
                    onRefresh={refreshWines}
                />}
            />
 
        </ScrollView>
    );
};

export default WineListScreen;