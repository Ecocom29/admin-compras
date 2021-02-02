import {StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({

    contenerdor:{
      flex: 1,
      justifyContent: 'center',
       fontSize: 10
    },
     contenido:{
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
     },
      titulo:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize:30,
        fontWeight: 'bold',
        color: '#73879C'
      },
      input:{
        backgroundColor:'#FFF',
        marginTop: 20,
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginLeft: 15
        
      },
      boton:{
        backgroundColor: '#26B99A',
        marginTop: 20,
        justifyContent: 'center',
        marginHorizontal: 16,
      },
      botonRegister:{
        backgroundColor: '#17a2b8',
        marginTop: 20,
        justifyContent: 'center',
        marginHorizontal: 16,
       
      },
      botonTexto:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
      },
      enlace:{
        color:'#73879C',
        marginTop: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:18,
        textTransform: 'uppercase'
      },
      TextProperty:{
        textAlign: 'center',
        marginTop: 120,
      }
})

export default globalStyles;