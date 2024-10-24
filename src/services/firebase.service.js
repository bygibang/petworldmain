import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const API_KEY = import.meta.env.VITE_API_KEY;




export const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: "hellopeople-762f4.firebaseapp.com",
	projectId: "hellopeople-762f4",
	storageBucket: "hellopeople-762f4.appspot.com",
	messagingSenderId: "322180065192",
	appId: "1:322180065192:web:6589d5edbb6a054df29f9d",
	measurementId: "G-32JB4JXCXL"
 };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth(app)
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider()