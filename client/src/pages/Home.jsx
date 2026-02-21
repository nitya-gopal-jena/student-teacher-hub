import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';

const Home = () => {

    const navigate = useNavigate();
  return (
    <>
      <div className='home-container'>
        {/* Student Card  */}
        <h2 className='home-title'>Welcome to Student~Teacher Hub</h2>
        <div className='card-container'>
          <div className='login-card student-card'>
            <h2 className='card-title'>Student Portal</h2>
            <p>Access assignments, notes and courses</p>
            <button onClick={() => navigate('/student/login')}>Student Login</button>
          </div>

          {/* Teacher Card */}
          <div className='login-card teacher-card'>
            <h2 className='card-title'>Teacher Portal</h2>
            <p>Manage students, upload materials and assignments</p>
            <button onClick={() => navigate('/teacher/login')}>Teacher Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
