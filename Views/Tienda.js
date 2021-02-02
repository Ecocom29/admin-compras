import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, Text, Card, CardItem, Left, Right, Body, List, Thumbnail, ListItem, Content, Icon, Image, Tab, Tabs, TabHeading } from 'native-base'
import globalStyles from '../Styles/global';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { gql, useQuery, NetworkStatus } from '@apollo/client';

import DetallesCliente from './DetallesCliente';
import Perfil from './Perfil';

const OBTENER_PRODUCTOS_TIENDA = gql`
   query obtenerTodosProductos{
        obtenerTodosProductos{
            imagenes{
                imagen
            },
            nombre
            precio
            stock
            descripcion
            marca
            categoria
            empresa
            fechaAlta
            esActivo
        }
    }
`;


const Tienda = () => {
    const [correoElectronico, obtenerCorreo] = useState('');

    const navigation = useNavigation();
    const { data, loading, error, networkStatus, stopPolling } = useQuery(OBTENER_PRODUCTOS_TIENDA, {
        pollInterval: 5000
    });
    console.log(stopPolling)
    if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if (loading) return null;
    if (error) return `Error! ${error}`;

    console.log(data)
    console.log(loading)
    console.log(error)

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

    if (data) {
        return (
            <Container style={[globalStyles.contenerdor, { backgroundColor: '#FFFFFF' }]}>

                <Tabs >
                    <Tab heading={<TabHeading><Text>Productos</Text></TabHeading>}>
                        <Content >

                            {
                                data.obtenerTodosProductos.map(productos => (
                                    <List key={productos.id}>
                                        <ListItem thumbnail key={productos.id}
                                            onPress={() => navigation.navigate("DetalleProducto", productos)}

                                        >
                                            <Left>
                                                {
                                                    productos.imagenes.map(imagen => (
                                                        <Thumbnail square source={{ uri: imagen.imagen }} />
                                                    ))
                                                }

                                            </Left>
                                            <Body>
                                                <Text>{productos.nombre}</Text>
                                                <Text>Precio: ${productos.precio}</Text>
                                            </Body>
                                            <Right>

                                                <Icon name="arrow-forward" />

                                            </Right>
                                        </ListItem>
                                    </List>
                                ))
                            }

                        </Content>
                    </Tab>
                    <Tab heading={<TabHeading><Text>Perfil</Text></TabHeading>}>

                    </Tab>
                    <Tab heading={<TabHeading><Icon name="apps" /></TabHeading>}>

                     <Button
                            squeare
                            block
                            style={globalStyles.boton}
                            onPress={() => obtenerEmail()}
                        >
                            <Text>Cerrar sesión</Text>
                        </Button>

                       

                    </Tab>
                </Tabs>
            </Container>
        )
    } else {
        return (
            <Container style={[globalStyles.contenerdor, { backgroundColor: '#FFFFFF' }]}>
                <Content >
                    <Text>No existen productos</Text>
                </Content>
            </Container>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        fontSize: 13,
    }
});

export default Tienda;