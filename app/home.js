//useState: hook que permite guardar y actualizar datos en el componente
//useEffect: hook que ejecuta código cuando el componente se monta o actualiza
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react'; 
import { getRestaurantes } from '../services/api';

//Mapa de imágenes por categoría
const imagenesPorCategoria = {
  'Parrilla': require('../assets/images/parrillada.png'),
  'Japonés': require('../assets/images/sushi.png'),
  'Pizza': require('../assets/images/pizza.png'),
};

export default function HomeScreen() {
  //Estado local que guarda la lista de restaurantes
  //restaurantes: valor actual (array vacío al inicio)
  //setRestaurantes: función para actualizar el valor
  const [restaurantes, setRestaurantes] = useState ([]);

  //useEffect con array vacío [] como segundo parámetro
  //se ejecuta UNA SOLA VEZ cuando el componente se monta en pantalla
  //equivale a un "al cargar la pantalla, hacé esto"
  useEffect(() => {
    cargarRestaurantes();
  }, []);

  //Función asíncrona que llama al backend y aguarda los datos en el estado
  //async/await permite esperar la respuesta del backend antes de continuar
  const cargarRestaurantes = async () => {
    const data = await getRestaurantes(); //espera que llegue el JSON del backend
    setRestaurantes(data); //actualiza el estado con los datos recibidos
  }

  const renderRestaurante = ({ item }) => (
    <View style={styles.card}>

      {/*Foto de comida según categoría*/}
      <View style={styles.imagenContainer}>
        <Image
        source={imagenesPorCategoria[item.category] || require('../assets/images/parrillada.png')}
        style={styles.imagenComida}
      />

      {/*Si stá cerrado, capa oscura con texto*/}
      {!item.isOpen && (
        <View style={styles.cerradoOverlay}>
          <Text style={styles.cerradoTexto}>Cerrado</Text>
        /</View>
      )}
    </View>

    {/*Info del restaurante*/}
    <View style={styles.infoContainer}>

      {/*Logo del restaurante*/}
      <Image
      source={{ uri: item.imageUrl }}
      style={styles.logo}
    />

    {/*Nombre, categoría y rating*/}
    <View style={styles.textoContainer}>
      <View style={styles.nombreRating}>
        <Text style={styles.nombre}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.estrella}>★</Text>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.categoria}>{item.category} - {item.address}</Text>
      </View>

    </View>
  </View>
  );

  return (
    <View style={styles.container}>

      {/*Barra superior naranja*/}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
          style={styles.searchInput}
          placeholder='Buscar locales y platos'
          placeholderTextColor="#999"
        />
      </View>
    </View>

    {/*Lista de restaurantes*/}
    <FlatList
    data={restaurantes}
    keyExtractor={(item) => item.id}
    renderItem={renderRestaurante}
    contentContainerStyle={styles.lista}
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  //Barra superior naranja
  header: {
    backgroundColor: "#F47920",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  lista: {
    padding: 15,
  },
  //Tarjeta de cada restaurante
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
      
    },
    imagenContainer: {
      position: "relative",
    },
    imagenComida: {
      width: '100%',
      height: 160,
      resizeMode: 'cover',
    },
    //Capa oscura cuando está cerrado
    cerradoOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      padding: 10,
    },
    cerradoTexto: {
      color: "#fff",
      fontWeight: 'bold',
      fontSize: 14,
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
    },
    infoContainer: {
      flexDirection: 'row',
      padding: 12,
      alignItems: 'center',
    },
    logo: {
      width: 55,
      height: 55,
      borderRadius: 8,
      marginRight: 12,
      resizeMode: 'contain',
      backgroundColor: "#f0f0f0",
    },
    textoContainer: {
      flex: 1,
    },
    nombreRating: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    nombre: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "#1a1a1a",
      flex: 1,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    estrella: {
      color: "#FFB800",
      fontSize: 16,
      marginRight: 2,
    },
    rating: {
      fontSize: 14,
      fontWeight: 'bold',
      color: "#1a1a1a",
    },
    categoria: {
      fontSize: 13,
      color: "#666",
    },
});
