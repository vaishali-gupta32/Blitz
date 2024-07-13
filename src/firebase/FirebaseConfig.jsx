// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlopMIHWEWqZoHw-zxVwIqAAqUBfp7YDI",
  authDomain: "blitz-32.firebaseapp.com",
  projectId: "blitz-32",
  storageBucket: "blitz-32.appspot.com",
  messagingSenderId: "1097405182500",
  appId: "1:1097405182500:web:f9792530a914746a541eb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();


export { fireDB, auth, storage,provider, signInWithPopup };
