import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD96tPhYdOvdESuJC22Quc7WSri4vaOMAo",
    authDomain: "stinger-ecommerce.firebaseapp.com",
    projectId: "stinger-ecommerce",
    storageBucket: "stinger-ecommerce.firebasestorage.app",
    messagingSenderId: "603326121293",
    appId: "1:603326121293:web:0f7a5dfa9ac2b6a8d32304",
    measurementId: "G-9Z5KM9ZFCB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
