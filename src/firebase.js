import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCaSbhj53gEtf-ThfzundugXo3bJ9V-7c4",
    authDomain: "timeless-luxe.firebaseapp.com",
    projectId: "timeless-luxe",
    storageBucket: "timeless-luxe.appspot.com",
    messagingSenderId: "702659487500",
    appId: "1:702659487500:web:f03a0eea1b05dd5ff08b29",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
