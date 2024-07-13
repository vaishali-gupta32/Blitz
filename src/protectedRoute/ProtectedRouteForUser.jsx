import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteForUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('users'));

  if (!user || user.role.toLowerCase() !== 'user') {
    return <Navigate to="/login" />;
  }

  return children;
};
