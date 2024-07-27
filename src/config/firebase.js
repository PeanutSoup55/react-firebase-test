// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMSYh1yCaDGfH5d9Y4wHXCzks69eFwdVI",
  authDomain: "web1-e95eb.firebaseapp.com",
  projectId: "web1-e95eb",
  storageBucket: "web1-e95eb.appspot.com",
  messagingSenderId: "204241734780",
  appId: "1:204241734780:web:47a1f5d838627a98c20df9",
  measurementId: "G-GKBW87XZK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);