// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1KiQZx3fJkxvOtQ8LG9L1cck5Sx9LDoQ",
  authDomain: "bodkazaprazdninami-16842.firebaseapp.com",
  projectId: "bodkazaprazdninami-16842",
  storageBucket: "bodkazaprazdninami-16842.appspot.com",
  messagingSenderId: "936157622009",
  appId: "1:936157622009:web:bda2ffab605e0791833c28",
  measurementId: "G-HWXDRXG8NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getFirestore(app);