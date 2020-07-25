import { useEffect, useState } from 'react';
import yelp from '../api/yelp';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (searchTerm) => {
        setErrorMessage('');
        try {
            let results;
            searchTerm = searchTerm ? searchTerm : " ";
            const jsonValue = await AsyncStorage.getItem(searchTerm);
            
            if (jsonValue === null) {
                const response = await yelp.get('/search', {
                    params: {
                        limit: 50,
                        term: searchTerm,
                        location: 'Portland'
                    }
                });
                results = response.data.businesses;
                stringValue = JSON.stringify(results);
                await AsyncStorage.setItem(searchTerm, stringValue);
            } else {
                results = JSON.parse(jsonValue);
            }

            setResults(results);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        searchApi('pasta'); 
    }, []) // call only one time

    return [searchApi, results, errorMessage];
};