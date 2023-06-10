import React from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";
import LoginScreen from "../Login";

export const ProtectLayout = ({ children }) => {
  const auth = useAuth();

  if (!auth.email) {
    return <LoginScreen />;
  }

  return children;
};