# Marketplace Mobile App

Aplicación mobile desarrollada con [Expo](https://expo.dev) y React Native que consume el backend dockerizado del proyecto marketplace para mostrar una lista de restaurantes.

---

## Requisitos previos

Antes de comenzar, tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Expo Go](https://expo.dev/go) o Android Studio con un emulador configurado
- [Git](https://git-scm.com/)
- El backend dockerizado corriendo (ver sección [Configurar el backend](#-configurar-el-backend))

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <https://github.com/proyecto-ti-2026/poc-docker-railway-stack>
cd mobile
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la URL del backend

Abrir el archivo `services/api.js` y asegurarse de que la URL apunte al backend:

```javascript
// Para emulador Android
const API_URL = "http://10.0.2.2:8082/api/restaurants";

// Para dispositivo físico, usar la IP local de la PC
// const API_URL = "http://192.168.X.X:8082/api/restaurants";
```

### 4. Ejecutar la app

```bash
npx expo start -c
```

Luego presionar `a` para abrir en el emulador Android

---

## Configurar el backend

El backend se encuentra en un repositorio separado y se levanta con Docker.

### 1. Clonar el repositorio del backend

```bash
git clone https://github.com/proyecto-ti-2026/poc-docker-railway-stack poc-docker
cd poc-docker
```

### 2. Crear el archivo de variables de entorno

```bash
echo POSTGRES_DB=marketplace> .env
echo POSTGRES_USER=dev>> .env
echo POSTGRES_PASSWORD=devpass>> .env
echo JWT_SECRET=changeme>> .env
```

### 3. Crear el archivo de entorno del frontend (requerido por docker-compose)

```bash
mkdir frontend
echo. > frontend\.env.local
```

### 4. Resolver conflicto de puertos (si es necesario)

Si el puerto `5432` o `8080` ya están en uso en tu PC, editá el `docker-compose.yml`:

```yaml
db:
  ports:
    - "5433:5432"   # evita conflicto con PostgreSQL local

api:
  ports:
    - "8082:8080"   # evita conflicto con otros servicios
```

### 5. Levantar el backend

```bash
docker-compose up db api
```

Esperar hasta ver en los logs:
```
Tomcat started on port 8080 (http)
Started MarketplaceApiApplication
```

### 6. Verificar que el backend funciona

Abrir el navegador y entrar a:
```
http://localhost:8082/api/restaurants
```

Deberías ver un JSON con la lista de restaurantes.


## Estructura del proyecto

```
mobile/
├── app/
│   ├── index.js        # Pantalla de login
│   └── home.js         # Pantalla principal con lista de restaurantes
├── services/
│   └── api.js          # Configuración de llamadas al backend
└── assets/
    └── images/
```

---

## Endpoints del backend utilizados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/restaurants` | Lista todos los restaurantes |
| GET | `/api/restaurants?openOnly=true` | Solo restaurantes abiertos |
| GET | `/api/restaurants?category=Pizza` | Filtrar por categoría |
| GET | `/api/restaurants/{id}` | Obtener restaurante por ID |

---
