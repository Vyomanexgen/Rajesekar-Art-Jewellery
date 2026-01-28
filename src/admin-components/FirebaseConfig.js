import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEsB07A_EaRBMwi3XK5IoChxcj2s7sJl8",
  authDomain: "art-jewellery-vyomanexgen.firebaseapp.com",
  projectId: "art-jewellery-vyomanexgen",
  storageBucket: "art-jewellery-vyomanexgen.firebasestorage.app",
  messagingSenderId: "126143142830",
  appId: "1:126143142830:web:e90a9377acb1b43497463f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
