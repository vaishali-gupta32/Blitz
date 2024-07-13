import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('users'));

  if (!user || user.role.toLowerCase() !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};
