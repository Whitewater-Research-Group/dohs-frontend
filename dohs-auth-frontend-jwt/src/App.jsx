
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import NonHealthLogin from './components/Login2';
import SelectRole from './components/SelectRole';
import NonHealthDashboard from './components/NonHealthDashboard';



import './App.css';



function App() {
  return (

   
      <Router>
      <Routes>
        
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/health-login" element={<Login />} />
        <Route path="/non-health-login" element={<NonHealthLogin />} />
        <Route path="/login" element={<SelectRole />} />
        <Route path="/non-health-dashboard" element={<NonHealthDashboard />} />



        
        
        
      </Routes>
    </Router>
    
  );
}

export default App;


