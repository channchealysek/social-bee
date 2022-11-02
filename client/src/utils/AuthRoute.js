
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from './auth';

function AuthRoute() {
  const { user } = useContext(AuthContext);

  return (
    user ? <Navigate to="/" /> : <Outlet />
  );
}

export default AuthRoute;