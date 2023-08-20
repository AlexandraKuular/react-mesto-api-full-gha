import { Navigate } from 'react-router-dom';
import React from 'react';

function ProtectedRoute({ element, loggedIn }) {
  return (
    loggedIn ? element : <Navigate to="/sign-in" replace/>
  )
}

export default ProtectedRoute;