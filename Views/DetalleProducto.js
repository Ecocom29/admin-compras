import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

import globalStyles from '../Styles/global';
const DetalleProducto = ({ route }) => {


    console.log(route.params.imagenes);

    const fechaRegistro = new Date(Number(route.params.fechaAlta));

    const windowHeight = Dimensions.get('window').width;
    return (
        <>
            <Container style={[globalStyles.contenerdor, { backgroundColor: '#FFFFFF' }]}>
                <Content padder>
                    <Card style={{ flex: 0  }}>
                        <CardItem>
                            <Left>
                                {
                                    route.params.imagenes.map(imagen => (
                                        <Thumbnail source={{ uri: imagen.imagen }} />

                                    ))
                                }

                                <Body>
                                    <Text>{route.params.nombre}</Text>
                                    <Text note>{fechaRegistro.toLocaleString("es-MX")}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>                                
                                {
                                    route.params.imagenes.map(imagen => (
                                        <Image source={{ uri: imagen.imagen }} style={{ width: windowHeight, flex: 1 }} />
                                    ))
                                }
                                <Text>
                                    {route.params.descripcion}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent textStyle={{ color: '#87838B' }}>
                                    <Icon name="logo-github" />
                                    <Text>Existencia: {route.params.stock}</Text>
                                </Button>
                            </Left>
                            <Left>
                                <Button transparent textStyle={{ color: '#87838B' }}>
                                    <Icon name="logo-github" />
                                    <Text>Precio: ${route.params.precio}</Text>
                                </Button>
                            </Left>
                            <Left>
                                <Button transparent textStyle={{ color: '#87838B' }}>

                                    <Text>Añadir</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        </>
    )
}

export default DetalleProducto;