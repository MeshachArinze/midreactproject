import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactLoader from './components/Loader';
import * as ROUTES from "./constant/routes";
import UserContext from './context/User';
import useAuthListerner from './hooks/use-auth-listener';

import ProtectedRouted from './helpers/protected-routed';

function App() {

  return (
    <>
      
    </>
  )
}

export default App
