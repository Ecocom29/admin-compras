import React from 'react';
import { View } from 'react-native';
import { Text, Container, Title} from 'native-base';
import { gql, useQuery, NetworkStatus } from '@apollo/client'

const DetallesCliente = () =>{
    return(

        <View>
            <Text>Detalles del cliente

            "_id" : ObjectId("5f829b546580466130c571e6"),
            "tipoCliente" : "",
            "correoElectronico" : "test0111@pruebas.com",
            "contrasenia" : "$2b$10$N5i2PNbrLtkHV8v7slYHJ.cDQFNcK7bZlqd3p4i9MLEcYUzJN.hQC",
            "nombres" : "",
            "apellidos" : "",
            "numeroContacto" : "",
            "genero" : "",
            "fechaNacimiento" : "",
            "tarjetaPago" : "",
            "imagenPerfil" : "",
            "fechaAlta" : "Sun Oct 11 2020 00:42:44 GMT-0500 (GMT-05:00)",
            "esActivo" : 1,
            </Text>
        </View>
    )
}

export default DetallesCliente;