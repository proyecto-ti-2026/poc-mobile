import { View, Text, TextInput, TouchableOpacity, Button, Image, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = () => {
        if (email && password) {
            router.push("/home");
        }
    };

    return (
        //Imagen de fondo
        <ImageBackground
        source={require('../assets/images/fondo.png')}
        style={styles.background}
        >
        
        {/*Capa naranja con opacidad*/}
        <View style={styles.overlay} />

        {/*Contenido*/}
        <View style={styles.container}>

            {/*Logo*/}
            <Image
            source={require('../assets/images/logo_sin_fondo.png')}
            style={styles.logo}
            />

            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>¿Aún no tienes cuenta? Ingresá acá.</Text>

            {/*Campo email*/}
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="ejemplo@gmail.com"
                placeholderTextColor="#020100c0"
            />

            {/*Campo contraseña*/}
            <TextInput
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="*************"
                placeholderTextColor="#020100c0"
            />

            {/*Botón*/}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>¿Olvidaste tu contraseña?</Text>

        </View>

        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    //Capa naranja semitransparente encima del fondo
    overlay: {
        ...StyleSheet.absoluteFillObject, //cubre toda la pantalla
        backgroundColor: 'rgba(180, 80, 0, 0.65)', //naranja con opacidad 44
    },
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 40,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#020100',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#020100',
        marginBottom: 30,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 5,
        letterSpacing: 1,
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', //fondo blanco semitransparente
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        color: '#020100',
        fontSize: 15,
    },
    button: {
        width: '100%',
        backgroundColor:"#F47920",
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#020100',
    },
    footer: {
        marginTop: 30,
        fontSize: 16,
        color: '#020100',
    }
    
});