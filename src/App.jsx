
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login-med';
import NonHealthLogin from './pages/Login-nonmed';
import SelectRole from './pages/SelectRole';
import NonHealthDashboard from './pages/NonHealthDashboard';
import HealthDashboard from './pages/HealthDashboard';
import Home from './pages/Home';
import About from './pages/About';



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
        <Route path="/health-dashboard" element={<HealthDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />


        




        
        
        
      </Routes>
    </Router>
    
  );
}

export default App;


