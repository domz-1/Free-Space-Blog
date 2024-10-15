import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuLe_a3BhjDIcDIz9HfcW3sPldp49YOk8",
  authDomain: "blog-project-5c5cf.firebaseapp.com",
  projectId: "blog-project-5c5cf",
  storageBucket: "blog-project-5c5cf.appspot.com",
  messagingSenderId: "956265862666",
  appId: "1:956265862666:web:0da4883ca1a440d00f31f3",
  measurementId: "G-X8CSC7838T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable persistence for auth
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.log("Error enabling persistence: ", error);
  }
export const postsRef = collection(db, 'posts');
