// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7OH-SiyVt7kGXOfDx61Y0BvznCWLba_Y",
  authDomain: "snapbookv2.firebaseapp.com",
  projectId: "snapbookv2",
  storageBucket: "snapbookv2.appspot.com",
  messagingSenderId: "380109115788",
  appId: "1:380109115788:web:bf54e313c4433981e7c6a9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage };