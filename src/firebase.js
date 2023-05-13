// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAXenChmNXM0U5dSTi85c4YgfqLgyt47ZY",
//   authDomain: "streamline-rnr.firebaseapp.com",
//   projectId: "streamline-rnr",
//   storageBucket: "streamline-rnr.appspot.com",
//   messagingSenderId: "82480758811",
//   appId: "1:82480758811:web:47720b4e1342f6c74a78be",
//   measurementId: "G-8THZ43KXK0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
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
