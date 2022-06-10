import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDBWFIycmfHb56DxHzeY3lRY2UfpL1W8CY",
  authDomain: "safety-key.firebaseapp.com",
  databaseURL: "https://safety-key-default-rtdb.firebaseio.com",
  projectId: "safety-key",
  storageBucket: "safety-key.appspot.com",
  messagingSenderId: "492622345507",
  appId: "1:492622345507:web:a012ab37d05e5aafc98896"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

