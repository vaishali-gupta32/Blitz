// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc, arrayUnion, increment } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAlopMIHWEWqZoHw-zxVwIqAAqUBfp7YDI",
    authDomain: "blitz-32.firebaseapp.com",
    projectId: "blitz-32",
    storageBucket: "blitz-32.appspot.com",
    messagingSenderId: "1097405182500",
    appId: "1:1097405182500:web:f9792530a914746a541eb1"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, collection, getDocs, updateDoc, doc, arrayUnion, increment , storage};
