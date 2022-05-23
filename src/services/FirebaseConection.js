//import firebase from "firebase/app";
//import  "firebase/database";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from 'firebase/firestore';


//import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyD_MdB7V84IYoY9yggWQ3yCWmEJMylIpO8",
    authDomain: "borrador-a0724.firebaseapp.com",
    projectId: "borrador-a0724",
    storageBucket: "borrador-a0724.appspot.com",
    messagingSenderId: "177835894815",
    appId: "1:177835894815:web:c20484a66ef6ec27068d2a"
};
export const firebaseinitializeApp = () => {

  
    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, {
        experimentalForceLongPolling: true,
    });
    initializeApp(firebaseConfig);
    global.db_Firestore = db;

}

// Initialize Firebase
