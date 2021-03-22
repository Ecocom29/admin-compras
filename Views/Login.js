import React, { useState , useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { Container, Button, H1, Input, Text, Form, Item, Toast } from "native-base";
import globalStyles from '../Styles/global';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

//Apollo
import { gql, useMutation } from '@apollo/client';
import { Value } from 'react-native-reanimated';

const AUTENTICAR_CLIENTE = gql`
   mutation autenticarCliente($correoElectronico: String!, $contrasenia: String!){
        autenticarCliente(correoElectronico: $correoElectronico, contrasenia: $contrasenia){
            token
        }
    }
`;

const Login = () => {
    
    useEffect(()=>{
        AsyncStorage.getItem('token')
        .then(x=>{
            console.log("VERIFICANDO..." , x)
            navigation.navigate(x ? 'Tienda': 'Login')
        })
    }, []);

    const [correoElectronico, setGuardarCorreo] = useState('');
    const [contrasenia, setGuardarContrasenia] = useState('');

    const navigation = useNavigation();

    const [autenticarCliente] = useMutation(AUTENTICAR_CLIENTE);
    const [mensaje, guardarMensaje] = useState(null)
   


    const iniciarSesion = async () => {
       
        if (correoElectronico === '' || contrasenia === '') {
            //guardarMensaje('Todos los campos son obligatorios');
            notificacion('Todos los campos son obligatorios')
            //console.log('campos vacios')
            return
        }

        try {
            //Enviamos los datos al servidor
            const { data } = await autenticarCliente({
                variables: {
                    correoElectronico,
                    contrasenia
                }
            });        

            //Obtenermos la respuesta del servidor 
            const { token } = data.autenticarCliente;
            // console.log(token)
            //notificacion(data.autenticarCliente)

            //Guardar token en el storage
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('emailCliente', correoElectronico);

            clear();
            //Redireccionar
            navigation.navigate("Tienda");
        } catch (error) {
            console.log(error.message)
            notificacion(error.message)
            //guardarMensaje(error.message);
        }
    }

    const clear = () => {
        console.log('Limpiando inputs...')
        //this.el.clear();
        //this.txtCorreo.clear();
        setGuardarCorreo('');
        setGuardarContrasenia('');
    }
    const ClearInput = () => {
        console.log("doClear...");
        let textInput = this.refs["textInput"];
        console.log(textInput);
        textInput.clear();
    }

    const notificacion = (msj) => {
        Toast.show({
            text: msj,
            buttonText: 'OK',
            duration: 5000,
            buttonTextStyle: { color: "#761D26" },
            buttonStyle: { backgroundColor: "#dc3545" }
        })
    }
    const mostraAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 5000,
            buttonTextStyle: { color: "#761D26" },
            buttonStyle: { backgroundColor: "#dc3545" }
        })
    }

    return (
        <Container style={[globalStyles.contenerdor, { backgroundColor: '#D5D8DC' }]}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>ADMIN COMPRAS</H1>

                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <TextInput
                            keyboardType='email-address'
                            placeholder="Correo electrónico"
                            onChangeText={texto => setGuardarCorreo(texto)}
                            clearButtonMode='always'
                            autoCapitalize='none'
                            defaultValue={{ value: '' }}
                            name='txtCorreo'
                           
                        />

                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <TextInput
                            defaultValue={{ value: '' }}
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            onChangeText={texto => setGuardarContrasenia(texto)}
                            clearButtonMode='always'
                            autoCapitalize='none'
                            name='txtContrasenia'
                        />

                    </Item>

                </Form>
                <Button
                    squeare
                    block
                    style={globalStyles.boton}
                    onPress={() => iniciarSesion()}
                >
                    <Text>Iniciar sesion</Text>
                </Button>
                <Text
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                    style={globalStyles.enlace}
                >Crear cuenta</Text>

                <Text note style={globalStyles.TextProperty}>By ECC</Text>

                {mensaje && mostraAlerta}
            </View>
        </Container>
    );
}
export default Login;