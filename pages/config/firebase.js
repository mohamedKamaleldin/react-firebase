import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnjZBgugN-_t8M-VkT1B3nszh_lXbC8co",
  authDomain: "fir-1-ea912.firebaseapp.com",
  projectId: "fir-1-ea912",
  storageBucket: "fir-1-ea912.appspot.com",
  messagingSenderId: "742596108402",
  appId: "1:742596108402:web:08441ccbfafc28174ee2eb",
  measurementId: "G-RLP9ZXF32C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);