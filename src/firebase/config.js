import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDR2AD9WOh19zgVO6TGlSodPeZHOCwYT2w",
  authDomain: "assignment-help-project.firebaseapp.com",
  projectId: "assignment-help-project",
  storageBucket: "assignment-help-project.firebasestorage.app",
  messagingSenderId: "903964283985",
  appId: "1:903964283985:web:ebe8893afe6a1b7c711470",
  measurementId: "G-YW6EV5RR5R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);      // user login/signup
export const db = getFirestore(app);   // database (orders, reviews)
export const storage = getStorage(app);// file storage (পরে)
export default app;
