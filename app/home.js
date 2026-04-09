import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getRestaurantes } from '../services/api';



export default function HomeScreen() {
  const [restaurantes, setRestaurantes] = useState ([]);

  useEffect(() => {
    cargarRestaurantes();
  }, []);

  const cargarRestaurantes = async () => {
    const data = await getRestaurantes();
    setRestaurantes(data);
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Restaurantes
      </Text>
      {restaurantes.map((r) => (
        <View key={r.id} style={{ marginBottom: 15, borderWidth: 1, padding: 10, borderRadius: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{r.name}</Text>
          <Text>{r.category} - {r.address}</Text>
          <Text>{r.description}</Text>
          <Text>{r.rating} | {r.isOpen ? 'Abierto' : 'Cerrado'}</Text>
        </View>
      ))}
    </View>
  );
}
