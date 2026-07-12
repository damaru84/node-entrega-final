import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'dotenv/config';
console.log("Firebase Config");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.apiKey,                         //"AIzaSyB2KN1kHEVGyDV23aIA4wovrYQkStGLSis",
  authDomain: process.env.authDomain,                 //"talento-entrega-final.firebaseapp.com",
  projectId: process.env.projectId,                   //"talento-entrega-final",
  storageBucket: process.env.storageBucket,           //"talento-entrega-final.firebasestorage.app",
  messagingSenderId: process.env.messagingSenderId,   //"726531588234",
  appId: process.env.appId,                           //"1:726531588234:web:207a056b6b0b36a4942d73",
  measurementId: process.env.measurementId,           //"G-R3HWRKBXZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };