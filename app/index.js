import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '810288152034-bsspraoe3u7ee4smimgq161n0bd7kisg.apps.googleusercontent.com',
        androidClientId: '810288152034-ue85dpjhmqvt7nhi5our1gtg5dpot3n7.apps.googleusercontent.com',
        redirectUri: 'https://auth.expo.io/@xxmakaxx/mobile',
    });

    
    const fetchUserInfo = async (token) => {
        const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const user = await res.json();
        console.log('Usuario Google:', user);
        router.push("/home");
    };

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            fetchUserInfo(authentication.accessToken);
        }
    }, [response]);

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

            <Text style={styles.bienvenido}>Bienvenido de nuevo</Text>
            <Text style={styles.title}>Iniciar sesión</Text>
            <Text style={styles.subtitle}>Accedé a tu cuenta para continuar con tus pedidos.</Text>

            {/*Campo email*/}
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="tuemail@ejemplo.com"
                    placeholderTextColor="#999"
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
            </View>

            {/*Campo contraseña*/}
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Ingresá tu contraseña"
                    placeholderTextColor="#999"
                />
            </View>

            {/*Botón prinicipal*/}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            {/*Olvidaste contraseña*/}
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <View style={styles.separatorRow}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>o continua con</Text>
                <View style={styles.separatorLine} />
            </View>

            {/*Botón google*/}
            <TouchableOpacity 
                style={styles.googleButton}
                onPress={() => promptAsync()}
                disabled={!request}
            >
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleText}>Iniciar sesión con Google</Text>
            </TouchableOpacity>

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
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 30,
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    bienvenido: {
        fontSize: 13,
        color: '#F47920',
        fontWeight: '700',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 24,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    inputIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 13,
        color: '#020100',
        fontSize: 14,
    },
    button: {
        width: '100%',
        backgroundColor:"#F47920",
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 14,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    forgotPassword: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
    separatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    separatorLine: {
        flex: 1,
        height: 0.5,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    separatorText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        borderRadius: 8,
        padding: 13,
        gap: 10,
    },
    googleIcon: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4285F4',
    },
    googleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#020100',
    },
    
});