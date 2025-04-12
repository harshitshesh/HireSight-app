
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";




const firebaseConfig = {
    apiKey: "AIzaSyBfwzvQQyH-HYtfXQysoKB_tJFX96ADhzo",
    authDomain: "noresume-f4624.firebaseapp.com",
    projectId: "noresume-f4624",
    storageBucket: "noresume-f4624.firebasestorage.app",
    messagingSenderId: "384495965934",
    appId: "1:384495965934:web:b79a4d9bed8673460145ff"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)
export const db = getFirestore(app)  
