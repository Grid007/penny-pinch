// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [budget, setBudgetAmount] = useState(0);

  const login = (userToken) => {
    setToken(userToken);
    // Fetch the budget or other initial data here
  };

  const logout = () => {
    setToken(null);
    setBudgetAmount(0);
  };

  return (
    <AuthContext.Provider value={{ token, budget, setBudgetAmount, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
