import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqoRuDPDrZHv63koTrG2GulPSuLeUgnjI",
  authDomain: "fir-and-authentication-45128.firebaseapp.com",
  projectId: "fir-and-authentication-45128",
  storageBucket: "fir-and-authentication-45128.firebasestorage.app",
  messagingSenderId: "983627473363",
  appId: "1:983627473363:web:6b1f11da15c05262b78f26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
