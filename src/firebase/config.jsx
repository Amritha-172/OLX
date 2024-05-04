import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKTXLsVsprgiFNbFPbl-HorfCKt24x3Kg",
  authDomain: "olx-clone-5ad0d.firebaseapp.com",
  projectId: "olx-clone-5ad0d",
  storageBucket: "olx-clone-5ad0d.appspot.com",
  messagingSenderId: "391263147609",
  appId: "1:391263147609:web:7278baf91708c24e2d0348",
  measurementId: "G-MNBE1EZXTX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
