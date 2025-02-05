import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  apiKey: "AIzaSyB4Yr9l8g0PhgjoILHv67SzHeO4a8EB2JM",
  authDomain: "reactchatapp-4627d.firebaseapp.com",
  projectId: "reactchatapp-4627d",
  storageBucket: "reactchatapp-4627d.appspot.com",
  messagingSenderId: "235682168727",
  appId: "1:235682168727:web:00e842458d20e4a3f04ed2",
  measurementId: "G-HJ6KKWSFEC"
};

console.log("API Key:", import.meta.env.VITE_API_KEY);

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()

