import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth';
import firebaseConfig from "./fireBaseconfig";

const firebase = firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebase);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};
