import React, { useState, createContext } from "react";

// Define the AuthContext
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}>({
  isAuthenticated: true,
  login: () => {},
  logout: () => {},
});

// Komponent provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = () => {
    setIsAuthenticated(true);
    // redirect
  };
  const logout = () => setIsAuthenticated(false);

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
