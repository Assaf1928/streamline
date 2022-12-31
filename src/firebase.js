// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import {getFirestore} from '@firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtiiacKCZzuAC1THiEVHusaeAdW4u51jQ",
  authDomain: "streamline-8cef3.firebaseapp.com",
  databaseURL: "https://streamline-8cef3-default-rtdb.firebaseio.com",
  projectId: "streamline-8cef3",
  storageBucket: "streamline-8cef3.appspot.com",
  messagingSenderId: "55360055217",
  appId: "1:55360055217:web:a0a9997585579756bbbf90",
  measurementId: "G-3L2N562HJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore  = getFirestore(app);