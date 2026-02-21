import React from 'react';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import VerifyOtp from './pages/auth/VerifyOtp';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/student/login' element={<Login />} />
          <Route path='/student/signup' element={<Signup />} />
          <Route path='/student/verify-otp' element={<VerifyOtp />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
