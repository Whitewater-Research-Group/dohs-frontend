// src/App.jsx
//import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './pages/auth/Signup'
import Login from './pages/auth/Login-med'
import NonHealthLogin from './pages/auth/Login-nonmed'
import SelectRole from './pages/auth/SelectRole'
import NonHealthDashboard from './pages/dashboard/NonHealthDashboard'
import HealthDashboard from './pages/dashboard/NonHealthDashboard'
import Home from './pages/home/Home'
import About from './pages/about/About'
import DiseaseCaseReport from './pages/report-gen/Disease'
import EnvironmentalIncidentReportForm from './pages/report-gen/Environmental'
import Contact from './pages/contact/Contact'
import Chatbot from './pages/chatbot/Chatbot' 
import Surveillance from './pages/surveillance-data/Surveillance'
import Stakeholder from './pages/stakeholder/Stakeholder'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/health-login' element={<Login />} />
        <Route path='/non-health-login' element={<NonHealthLogin />} />
        <Route path='/login' element={<SelectRole />} />
        <Route path='/non-health-dashboard' element={<NonHealthDashboard />} />
        <Route path='/health-dashboard' element={<HealthDashboard />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/report-dis-cas' element={<DiseaseCaseReport />} /> 
        <Route path='/report-env-inc' element={<EnvironmentalIncidentReportForm />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/surveillance' element={<Surveillance />} />
        <Route path='/stakeholder' element={<Stakeholder />} />
        
      </Routes>
    </Router>
  )
}

export default App
