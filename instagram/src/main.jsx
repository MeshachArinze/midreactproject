import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles/app.css";
import FirebaseContext from "./context/firebase";
import { app, db } from "./lib/firebase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FirebaseContext.Provider value={{ app, db
  }}>
    <App />
  </FirebaseContext.Provider>
);
