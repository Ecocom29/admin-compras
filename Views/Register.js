import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, H1, Input, Text, Form, Item, Toast } from "native-base";
import globalStyles from '../Styles/global';
import { useNavigation } from '@react-navigation/native';

//Apollo
import { gql, useMutation } from '@apollo/client';

const CREA_CUENTA_CLIENTE = gql`
    mutation crearCliente( $correoElectronico: String, $contrasenia: String ){
        crearCliente( correoElectronico: $correoElectronico, contrasenia:$contrasenia)
    }
`;


const Register = () => {

    const [correoElectronico, guardarCorreo] = useState('');
    const [contrasenia, guardarContrasenia] = useState('');          

    const navigation = useNavigation();
    
    const [crearCliente ] = useMutation(CREA_CUENTA_CLIENTE);
   
    
    const [mensaje, guardarMensaje] = useState(null)
    
    const handleSubmit =  async () => {
        console.log('VALIDANDO FORMULARIO')
        //validar datos
        if ( correoElectronico === '' || contrasenia === ''){
            //guardarMensaje('Todos los campos son obligatorios');
            notificacion('Todos los campos son obligatorios')
            //console.log('campos vacios')
            return
        }

        if (contrasenia.length < 6){
            //guardarMensaje('La contrasena debe ser mayor a 6 caracteres');
            notificacion('La contrasena debe ser mayor a 6 caracteres')
            //console.log('validando caracteres')
            return
        }

        try{
            console.log(crearCliente)

            const { data } = await crearCliente({
                variables:{   
                    correoElectronico,
                    contrasenia 
                }
            });
            console.log(data)
            notificacion(data.crearCliente)

        }catch(error){
            console.log(error.message)
            notificacion(error.message)
            //guardarMensaje(error.message);
        }
    }

    const notificacion = (msj) => {
        Toast.show({
            text:msj,
            buttonText: 'OK',
            duration: 5000
        })
    }

    const mostraAlerta = () => {
        Toast.show({
            text:mensaje,
            buttonText: 'OK',
            duration: 5000
        })
    }

    return (
        <Container style={[globalStyles.contenerdor, { backgroundColor: '#D5D8DC' }]}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>ADMIN COMPRAS</H1>
                <Form >
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Correo Electronico"
                            onChangeText={texto => guardarCorreo(texto)}
                            autoCapitalize='none'
                        />

                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            onChangeText={texto => guardarContrasenia(texto)}
                            autoCapitalize='none'
                        />

                    </Item>
                </Form>
                <Button
                    squeare
                    block
                    style={globalStyles.botonRegister}
                   onPress={() => handleSubmit()}
                >
                    <Text>Crear cuenta</Text>
                </Button>
                <Text
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                    style={globalStyles.enlace}
                >Iniciar sesion</Text>

                {mensaje && mostraAlerta}
            </View>
        </Container>
    );
}
export default Register;