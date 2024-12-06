import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const ProtectedRoute = ({ children, only_authenticated, only_unauthenticated }) => {
  const { user, loading } = useUser();

  // Show a loading spinner while checking auth - re-implement later
  if (loading) return <div>Loading...</div>; 

  if (only_authenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  if (only_unauthenticated && user) {
    return <Navigate to="/chat" replace />;
  }

  return children;
};

export default ProtectedRoute;
