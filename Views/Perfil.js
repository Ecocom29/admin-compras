import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, Text, Card, CardItem, Left, Right, Body, List, Thumbnail, ListItem, Content, Icon, Image, Tab, Tabs, TabHeading } from 'native-base'
import globalStyles from '../Styles/global';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { gql, useMutation } from '@apollo/client';

// obtenerClientePorEmail
const OBTENER_CLIENTE_EMAIL = gql`
    query obtenerClientePorEmail($correoElectronico: String!){
     obtenerClientePorEmail(correoElectronico: $correoElectronico){
             id
             tipoCliente        
             correoElectronico
             contrasenia        
             nombres            
             apellidos          
             numeroContacto     
             genero             
             fechaNacimiento
             tarjetaPago     
             imagenPerfil
             fechaAlta        
             esActivo           
         }
     }
`;

const Perfil = () => {

    // const [obtenerClientePorEmail] = useMutation(OBTENER_CLIENTE_EMAIL);
    const navigation = useNavigation();
    const [loaded, setLoaded] = useState(false);

    //const [cliente, { loading, error }] = useMutation(OBTENER_CLIENTE_EMAIL)
    
    useEffect(() => {
        AsyncStorage.getItem('emailCliente')
            .then(x => {
                console.log(x)
                //cliente();

            })
    }, []);
    /* const { data, loading, error, networkStatus, stopPolling } = useQuery(OBTENER_CLIENTE_EMAIL, {
       pollInterval: 3000
    });

   

    if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if (loading) return null;
    if (error) return `Error! ${error}`;

    console.log('OBTENIENDO DATOS DEL CLIENTE...')
    console.log(data)
    console.log(loading)
    console.log(error) */



    /* const obtenerDatoCliente = async () => {
       
        const email = await AsyncStorage.getItem('emailCliente');

        const { data } = await obtenerClientePorEmail({
            variables: {
                email
            }
        });

        const datosCliente = data.obtenerClientePorEmail;

        console.log(datosCliente);

    } */
    const obtenerEmail = async () => {

        console.log("Removiendo token...");
        // const email = await AsyncStorage.getItem('emailCliente');
        // console.log(email);

        //Eliminar token
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('emailCliente');
        //Redireccionar
        navigation.navigate("Login");
    }

    return (
        <Container>
            <Content>

                {/* {
                    data.obtenerClientePorEmail.map(cliente => (
                            console.log(cliente)
                    ))
                }

                */}
                <Button
                    squeare
                    block
                    style={globalStyles.boton}
                    onPress={() => obtenerEmail()}
                >
                    <Text>Cerrar sesión</Text>
                </Button>

            </Content>
        </Container>
    )
}

export default Perfil;