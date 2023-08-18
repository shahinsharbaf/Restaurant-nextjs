"use client";

import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { getCookies } from "cookies-next";

export const AuthenticationContext = createContext({
  loading: false,
  error: null,
  data: null,
  token: null,
  setAuthState: () => {},
});

export default function AuthContext({ children }) {
  const [authState, setAuthState] = useState({
    loading: true,
    data: null,
    error: null,
    token: null,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const customjwt = getCookies("jwt").jwt;
      const response = await axios.post("http://localhost:3000/api/auth/me", {
        customjwt,
      });
      setAuthState({
        data: response?.data,
        error: null,
        loading: false,
      });
    } catch (error) {
      setAuthState({
        data: null,
        error: error,
        loading: false,
      });
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
