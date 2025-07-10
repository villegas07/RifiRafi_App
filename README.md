# 🎮 RifiRafi_App

**RifiRafi** es una aplicación móvil de trivia competitiva donde los jugadores responden preguntas por categorías y compiten por **premios reales**. Para participar, los usuarios pagan una tarifa de entrada por ronda y deben demostrar su conocimiento y agilidad mental para alcanzar lo más alto del ranking.

La app está desarrollada con **React Native** usando **Expo Go**, y utiliza **Axios** para consumir una API RESTful externa.

---

## 🧠 ¿Cómo funciona?

1. 📲 Los usuarios se registran o inician sesión.
2. 💸 Pagan una tarifa para ingresar a la ronda de preguntas.
3. ❓ Responden una serie de preguntas de opción múltiple.
4. 🏁 El sistema mide:
   - ✅ Número de respuestas correctas
   - ⏱️ Tiempo total que tarda el usuario en responder
5. 🏆 Se genera un **ranking** donde los primeros lugares obtienen premios.

---

## 🏅 Sistema de Ranking

Los jugadores se ordenan automáticamente en un ranking basado en:

- **Mayor cantidad de respuestas correctas**
- **Menor tiempo total en responder**

> En caso de empate en respuestas correctas, gana quien haya tardado menos tiempo.

---

## ⚙️ Tecnologías utilizadas

- React Native + Expo Go
- Axios
- React Navigation
- AsyncStorage
- JavaScript (ES6)

---

## 📲 Requisitos previos

- Tener instalado [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- Instalar Expo CLI globalmente:

```bash
npm install -g expo-cli
```
## Descargar Expo Go en tu dispositivo móvil:

- Android (Google Play)
- iOS (App Store)
---
## 🚀 Instalación y ejecución local
1. Clona el repositorio
```bash
git clone https://github.com/villegas07/RifiRafi_App.git
cd RifiRafi_App
```
---
2. Instala las dependencias del proyecto
```bash
npm install
```
---
3. Inicia el servidor de desarrollo con Expo
```bash
npm start
```
---
Esto abrirá una pestaña en tu navegador con un código QR para escanear con la app Expo Go.

## 📱 Ejecutar en tu celular
- Abre la app Expo Go en tu teléfono.
- Escanea el código QR que aparece en el navegador después de ejecutar npm start.
- La aplicación se cargará automáticamente en tu dispositivo.

## 🌐 Variables de entorno
- Puedes configurar una variable para la URL base de la API creando un archivo .env en la raíz del proyecto:
```bash
API_BASE_URL=https://rifi-rafi.onrender.com/api
```
Y accediéndola en el código con process.env.API_BASE_URL.
---

## 🔐 Autenticación
- La app utiliza tokens JWT para proteger solicitudes.
- El token se almacena localmente con AsyncStorage.
- Axios incluye el token en los headers de forma automática para llamadas protegidas.
---
## Crear rama y subir cambios:

```bash
git checkout -b feature/nueva-funcionalidad
git add .
git commit -m "Agrega nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```
Luego, abre un Pull Request desde GitHub.
---

## 📄 Licencia
© 2025 Brayan Villegas. Todos los derechos reservados.

- Este software es propiedad exclusiva del autor. No se permite su copia, redistribución, modificación ni uso con fines comerciales sin autorización explícita por escrito.
- Queda prohibido publicar o distribuir el código fuente o cualquier parte del sistema sin el consentimiento del propietario.
- Para licencias empresariales, soporte o colaboraciones, por favor contactar al autor.

👨‍💻 Autor
Brayan Villegas
GitHub: @villegas07
---
¡Gracias por usar RifiRafi!
Compite, responde y ¡gana premios! 🏆📱
