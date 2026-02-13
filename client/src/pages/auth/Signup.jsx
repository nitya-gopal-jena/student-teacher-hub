import React from 'react';

const Signup = () => {
  return (
    <>
      <div className='signup-container'>
        <div className='signup-box'>
          <form action=''>
            <h3 className='form-title'>Create a account</h3>

            <div className='form-groups'>
              <input type='text' placeholder='Enter your name' id='name' />
            </div>

            <div className='form-groups'>
              <input type='email' placeholder='Enter your email' id='email' />
            </div>

            <div className='form-groups'>
              <input type='password' placeholder='Enter password' id='password' />
            </div>

            <div className='form-groups'>
              <input type='number' placeholder='Enter your age' id='age' />
            </div>

            <div className='submit-btn'>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
