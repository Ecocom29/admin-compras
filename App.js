import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import 'react-native-gesture-handler';
import { Root, Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from './Views/Login';
import Register from './Views/Register';
import Tienda from './Views/Tienda';
import DetalleProducto from './Views/DetalleProducto';
import { Header } from 'react-native/Libraries/NewAppScreen';

/* const cerrarSession = (cliente, history)=>{
  //Remover el token del localstorage
  localStorage.removeItem('token', '');

  //Desloguear al usuario
  //cliente.resetStore();

  //Redireccionar a la pagina de login
  //history.push('./Login');
} */

const App = () => {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Inicio de sesion',
                headerStyle: {
                  backgroundColor: '#2A3F54',
                },
                headerTintColor: '#FDFEFE',
                headerTitleAlign: 'center',
                headerRight: () => (
                  <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#fff"
                  />
                ),
              }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                tittle: "Crear cuenta",
                headerStyle: {
                  backgroundColor: "#2A3F54"
                },
                headerTintColor: "#FDFEFE",
                headerTitleAlign: 'center'
                /* headerLeft: (props) => (
                   <HeaderBackButton
                     {...props}
                     onPress={() => {
                       //cerrarSession()
                       console.log("Cerrando sesion");
                     }}
                   />
                 ),*/
              }}

            />

            <Stack.Screen
              name="Tienda"
              component={Tienda}
              options={{
                tittle: "Tienda",
                headerStyle: {
                  backgroundColor: "#2A3F54",
                },
                headerTitleAlign: 'left',
                headerTintColor: "#FDFEFE",

              }}

            />

            <Stack.Screen
              name="DetalleProducto"
              component={DetalleProducto}
              options={({ route }) => ({
                tittle: route.params.nombre,
                headerStyle: {
                  backgroundColor: "#2A3F54",
                },
                headerTintColor: "#FDFEFE",

              })
              }
            />

          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </>
  );
}

export default App;
