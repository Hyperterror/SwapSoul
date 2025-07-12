 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  EmailAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { 
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-kXinscn7Ls6N9AW9o-IUvtibg3c8Dnk",
  authDomain: "swapsoul-5242d.firebaseapp.com",
  projectId: "swapsoul-5242d",
  storageBucket: "swapsoul-5242d.firebasestorage.app",
  messagingSenderId: "426467995509",
  appId: "1:426467995509:web:afa0c61e87ed7e8a6cad3c",
  measurementId: "G-54YTJP5KZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export the services you'll use
export { 
  auth,
  googleProvider,
  facebookProvider,
  EmailAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  db,
  analytics
};
// Then export them
export {
  // ... existing exports
  onAuthStateChanged,
  signOut,
  updateProfile
};