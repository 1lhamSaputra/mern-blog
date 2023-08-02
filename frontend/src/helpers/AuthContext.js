import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { removeCookie, getCookie, setCookie } from '../helpers/Cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check the login status when the component mounts
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = getCookie('token');
    try {
      // Send a request to the backend to check if the user is logged in
      const response = await axios.get('http://localhost:3001/api/auth/check-login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleLogin = async (userData) => {
    // Perform your login logic, e.g., sending credentials to the backend
    // If the login is successful, update the isLoggedIn state and set the token
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', userData);
      setIsLoggedIn(true);
      setCookie('token', response.data.token, 2);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    // Perform your logout logic, e.g., removing the token and updating the state
    removeCookie('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
