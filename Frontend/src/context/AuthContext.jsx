import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const BASE_URL = "https://book-management-seven-sepia.vercel.app/api/users";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      setUser(res.data);
    } catch (error) {
      throw error.response?.data?.message || "Login failed. Please try again.";
    }
  };

  // Register function
  const register = async (formData) => {
    try {
      const res = await axios.post(`${BASE_URL}/register`, formData);
      setUser(res.data);
    } catch (error) {
      throw error.response?.data?.message || "Registration failed. Please try again.";
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
