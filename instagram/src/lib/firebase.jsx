import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWQkNe_JUuD68WEI8wAi6dsv1ttqINrJE",
  authDomain: "instagram-f8424.firebaseapp.com",
  projectId: "instagram-f8424",
  storageBucket: "instagram-f8424.appspot.com",
  messagingSenderId: "578879631028",
  appId: "1:578879631028:web:bf8289100956158cfdb1e1",
  measurementId: "G-Q3EDE1M1HV",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();

export { app, db, analytics };
