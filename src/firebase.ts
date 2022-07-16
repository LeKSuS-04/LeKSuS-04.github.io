import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { user } from './store/user';

const firebaseConfig = {
  apiKey: "AIzaSyDfCire_DYhgZlJOsAn4sUzMK6GkEKo9kQ",
  authDomain: "my-website-cf995.firebaseapp.com",
  databaseURL: "https://my-website-cf995-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-website-cf995",
  storageBucket: "my-website-cf995.appspot.com",
  messagingSenderId: "769955482232",
  appId: "1:769955482232:web:dfeab38df92a9ddec37b8d",
  measurementId: "G-RD0PF23BN1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
auth.onAuthStateChanged(newUser => user.set(newUser));
