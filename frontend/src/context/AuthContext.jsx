import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, login, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData.success) {
          setUser(userData.user);
        }
      } catch (error) {
        console.log('No user logged in or error fetching user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

const handleLogin = async (email, password, role) => {
  const data = await login(email, password, role);

  // Your backend directly returns user object
  if (data && data._id) {
    setUser(data);
    return {
      success: true,
      user: data,
    };
  }

  return {
    success: false,
    message: "Login failed",
  };
};

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
