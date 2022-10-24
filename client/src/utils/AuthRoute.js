
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';

import { AuthContext } from './auth';

export default function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Navigate to="/" /> : <Component {...props} />
      }
    />
  );
};