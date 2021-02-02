import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App';
//Apollo
import client from './Config/Apollo';
import {ApolloProvider} from '@apollo/client';

const adminComprasApp = () =>(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(adminComprasApp);
