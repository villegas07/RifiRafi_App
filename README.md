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

  Descargar Expo Go en tu dispositivo móvil:

Android (Google Play)

iOS (App Store)

🚀 Instalación y ejecución local
```bash
## npm install -g expo-cli
1. Clona el repositorio
bash
Copiar código
---
git clone https://github.com/villegas07/RifiRafi_App.git
cd RifiRafi_App

2. Instala las dependencias del proyecto
bash
Copiar código
npm install

3. Inicia el servidor de desarrollo con Expo
bash
Copiar código
npm start
