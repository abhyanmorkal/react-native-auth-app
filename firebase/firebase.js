// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuLaxRiP5VCl46wr7GBazJHq9LzOLl_cI",
  authDomain: "ecom-rn-97f9a.firebaseapp.com",
  projectId: "ecom-rn-97f9a",
  storageBucket: "ecom-rn-97f9a.appspot.com",
  messagingSenderId: "683634056144",
  appId: "1:683634056144:web:3bf81ad28b729fc7f037d5",
  measurementId: "G-X6P4HB2RET",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
