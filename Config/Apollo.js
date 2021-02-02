import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const httpLink = createHttpLink({
    uri: Platform.OS === 'ios' ? 'http://localhost:5000/graphql' :'http://10.0.0.11:5000/graphql'
})

const authLink = setContext( async(_,{headers }) =>{
    //Leer el token
    const token  = await AsyncStorage.getItem('token');
    console.log(token);

    return{
        headers:{
            ...headers,
            authorization: token ? `bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;