import { View, Text, TextInput, Button, Image } from 'react-native';
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
        <View style={{ padding: 20, alignItems: 'center' }}>

            {/* Logo */}
            <Image
            source={require('../assets/images/logo.png')}
            style={{ width: 120, height: 120, marginBottom: 20 }}
            />

            <Text>Email</Text>
            <TextInput
            style={{ borderWidth: 1, width: '100%', marginBottom: 10 }}
            value={email}
            onChangeText={setEmail}
            />

            <Text>Contraseña</Text>
            <TextInput
            secureTextEntry
            style={{ borderWidth: 1, width: '100%', marginBottom: 10 }}
            value={password}
            onChangeText={setPassword}
            />

            <Button title="Ingresar" onPress={handleLogin} />

        </View>
    );
}