import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const App = () => {
 
   const[isAuthenticated,setIsAuthenticated] = useState(false)
   const [loading,setLoading] = useState(true)

   useEffect(()=>{
    const token = localStorage.getItem("authToken")
    if(token){
      setIsAuthenticated(true)
    } 
    setLoading(false)
   },[])

   if(loading) return null
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={isAuthenticated?<Navigate to="/dashboard"/>:<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
)};

export default App;
