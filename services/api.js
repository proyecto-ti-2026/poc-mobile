// Emulador Android: 10.0.2.2 es el localhost del host visto desde el emulador
const API_URL = "http://10.0.2.2:8080/api/restaurants";

{/* Se declara getRestaurantes la cual se llamará en el home.js y devolerá los restaurantes */}
export const getRestaurantes = async () => { 
    try {
        console.log("URL:", API_URL);

        const res = await fetch(API_URL);
        
        console.log("STATUS:", res.status);

        const text = await res.text();
        console.log("RESPUESTA:", text);

        return JSON.parse(text);

    } catch (error) {
        console.error(error);
        return[];
    }

};