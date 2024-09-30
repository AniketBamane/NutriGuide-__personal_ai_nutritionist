import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // For Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAwcX6d2jsTmnTy6ozF_70QGGldTlk1VaI",
  authDomain: "aichatbot-ae2ed.firebaseapp.com",
  projectId: "aichatbot-ae2ed",
  storageBucket: "aichatbot-ae2ed.appspot.com",
  messagingSenderId: "397427317792",
  appId: "1:397427317792:web:88bc9ebcd36525775db045"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore

export default app;