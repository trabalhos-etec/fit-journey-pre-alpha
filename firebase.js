// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsjG4YFxHoAeYEYA1G88fmSZ1zvsNKsnk",
  authDomain: "fit-journey-users.firebaseapp.com",
  projectId: "fit-journey-users",
  storageBucket: "fit-journey-users.appspot.com",
  messagingSenderId: "112270504735",
  appId: "1:112270504735:web:983e61b0de94fc28a7362a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);
export { auth };
