import React, { createContext, useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getUser: () => {},
});
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      // navigate(location.pathname);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === "/") {
        navigate("/chat");
      } else {
        navigate(location.pathname);
      }
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/chat");
  };

  const getUser = () => {
    return isAuthenticated ? JSON.parse(localStorage.getItem("token")) : {};
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
