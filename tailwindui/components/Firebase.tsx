// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA92IC70sNJO71rdj2k8mlYLRUv2H_kNHk",
  authDomain: "drlambda-842e3.firebaseapp.com",
  projectId: "drlambda-842e3",
  storageBucket: "drlambda-842e3.appspot.com",
  messagingSenderId: "326847044630",
  appId: "1:326847044630:web:9ef305a300dccb4f9ea937"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();