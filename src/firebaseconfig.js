import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9WH3MmOztmdv6nGapMhTOf7E3dsNTAi8",
    authDomain: "display-9b87a.firebaseapp.com",
    projectId: "display-9b87a",
    storageBucket: "display-9b87a.appspot.com",
    messagingSenderId: "241946279832",
    appId: "1:241946279832:web:11f0587b9142f0160b35ed",
    measurementId: "G-HHYH475BWW"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);