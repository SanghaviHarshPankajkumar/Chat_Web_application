// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmfIUIoTd3CnLnlk6jg5Atw8NdLigNlR4",
  authDomain: "chat-app-79f56.firebaseapp.com",
  projectId: "chat-app-79f56",
  storageBucket: "chat-app-79f56.appspot.com",
  messagingSenderId: "958486988943",
  appId: "1:958486988943:web:e260681eda05050a53c8fa",
  measurementId: "G-TCRS257HW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
