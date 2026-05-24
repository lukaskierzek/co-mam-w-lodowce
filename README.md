# Co mam w lodówce 🧊

## Tryby uruchomienia

| Profil | Komenda | Auth | Opis                                                                         |
|--------|---------|------|------------------------------------------------------------------------------|
| **DEV** | `npm run dev` | 💾 localStorage | Brak Firebase, dane lokalnie w przeglądarce. Szybki start, działa offline.   |
| **DEVPROD** | `npx vite --mode devprod` | 🔥 Firebase | Lokalny serwer dev, ale auth przez Firebase. Wymaga połączenia z internetem. |
| **PROD** | `npm run build` | 🔥 Firebase | Todo - pewnie kiedyś może na koniec                                          |


### Wymagane pliki środowiskowe

- `.env` — klucze Firebase + `VITE_USE_FIREBASE=false` (tryb DEV)
- `.env.devprod` — klucze Firebase + `VITE_USE_FIREBASE=true` (tryb DEVPROD)
- `.env.production` — klucze Firebase + TODO...

> Pliki `.env` nie są commitowane do repozytorium. Skopiuj je od innego członka zespołu lub uzupełnij ręcznie na podstawie Firebase Console.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAsxrULuH5VA3mnJh-rGLG8uWNCKM4ahXU",
authDomain: "comamwlodowce-cc57d.firebaseapp.com",
projectId: "comamwlodowce-cc57d",
storageBucket: "comamwlodowce-cc57d.firebasestorage.app",
messagingSenderId: "223517092167",
appId: "1:223517092167:web:932ddb4bd8840a0b510462",
measurementId: "G-SBMEKWEPLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);