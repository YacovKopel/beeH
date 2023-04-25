// Import the functions you need from the SDKs you need
import {initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9hhPUaBeIJqcF-OAtLTPw96EfQDCU7nE",
  authDomain: "kiruv-services-dev.firebaseapp.com",
  projectId: "kiruv-services-dev",
  storageBucket: "kiruv-services-dev.appspot.com",
  messagingSenderId: "1054183790894",
  appId: "1:1054183790894:web:fba8b5b98e0d93c15b02bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app)

export {db};