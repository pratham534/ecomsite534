import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { isAuthenticated } from './index'


export default function PrivateRoute({ Component, ...rest }) {
    let auth = isAuthenticated();
    const navigate = useNavigate();
    return (
      <Route
        {...rest}
        render={(props) =>
          auth ? (
            {Component}
          ) : (
            navigate('/signin')
          )
        }
      />
    );
  }