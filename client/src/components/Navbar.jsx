import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    navigate('/student/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
    }
  },);

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    toast.success('Logout Successfully');
    navigate('/student/login');
  };

  return (
    <>
      <div className='navbar'>
        <div className='nav-logo'>
          <h3>Student~Teacher-Hub</h3>
        </div>

        <div className='item-groups'>
          <Link to='/'>Home</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to='/contact'>Contact</Link>
        </div>

        <div className='login-btn'>
          {!isLoggedIn ? (
            <button type='submit' className='login' onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button type='submit' className='logout' onClick={handleLogOut}>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
