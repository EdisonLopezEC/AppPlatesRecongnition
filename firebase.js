// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

import { getFirestore } from 'firebase/firestore/lite';
// import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDl4kTFDK7B-YjEHmKVfC2DNiHgjTOIwtA",
//     authDomain: "iaplacas.firebaseapp.com",
//     projectId: "iaplacas",
//     storageBucket: "iaplacas.appspot.com",
//     messagingSenderId: "718516491638",
//     appId: "1:718516491638:web:cb06d431228dc1aee41657"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyCJaYNOdMGqz2zBTVvhGa1j-nvZgC2beX4",
  authDomain: "placas-2ca67.firebaseapp.com",
  projectId: "placas-2ca67",
  storageBucket: "placas-2ca67.appspot.com",
  messagingSenderId: "540017227417",
  appId: "1:540017227417:web:b52e9faeb52b17f16f2a08"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = getFirestore(app);
const auth = firebase.auth();

export { db, auth };



