import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const initialFormData = {
    username: '',
    password: '',
    email: '',
    mobile: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  // const [message, setMessage] = useState('');

  const showToastMessage = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleName = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, username: value });
    setIsUsernameValid(value.length !== 0);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    setIsPasswordValid(value.length >= 6);
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsEmailValid(emailPattern.test(value));
  };

  const handleMobile = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, mobile: value });
    setIsMobileValid(value.length === 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.username.trim() !== '' &&
        formData.password.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.mobile.trim() !== '' &&
        isUsernameValid &&
        isPasswordValid &&
        isEmailValid &&
        isMobileValid
      ) {
      
       const response = await axios.post('https://markdown-connecting.onrender.com/api/auth/register', formData)
       .catch(error => {
        if (error.response) {
          console.log(error.response.data); // Log the error response
        }
    
      })
       

        setFormData(initialFormData);
        
        setTimeout(() => {
          navigate('/login');
        },2000 );
        showToastMessage('Registration Successful', 'success');
      } else {
        showToastMessage('Please fill in all required fields', 'error');
      }
    } catch (error) {
      console.error('Error registering:', error);
      showToastMessage('Registration failed. Please try again.', 'error');
    }
  };

  return (
    <main>
    <div className="container" style={{ width: 300 }}>
      <h1>R <span style={{color:"red"}}>E</span> <span style={{color:"blue"}}>G</span> <span style={{color:"green"}}>I</span> <span style={{color:"yellow"}}>S</span>
       <span style={{color:"pink"}}>T</span> <span style={{color:"orange"}}>E</span> <span style={{color:"neon"}}>R</span></h1>
       <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className='title'>Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="name"
            value={formData.username}
            onChange={handleName}
          />
        </div>
        {!isUsernameValid && <div className="error">Please enter a username.</div>}

        <div className="form-group">
          <label htmlFor="password" className='title'>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handlePassword}
          />
        </div>
        {!isPasswordValid && (
          <div className="error">Please enter a valid password (at least 6 characters).</div>
        )}

        <div className="form-group">
          <label htmlFor="email" className='title'>Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmail}
          />
        </div>
        {!isEmailValid && <div className="error">Please enter a valid email address.</div>}

        <div className="form-group">
          <label htmlFor="mobile"className='title'>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleMobile}
          />
        </div>
        {!isMobileValid && (
          <div className="error">Please enter a valid mobile number (10 digits).</div>
        )}

        <div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
    </main>
  );
}

export default Register;
