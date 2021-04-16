import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectors from '../redux/selectors';

const PrivateRoute = ({ component: Component, redirectTo, ...routeProps }) => {
  const isAuthenticated = useSelector(selectors.isAuthenticated);
  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

export default PrivateRoute;
