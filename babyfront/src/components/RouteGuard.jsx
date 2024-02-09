import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RouteGuard = ({ children }) => {
    const hasJWT = () => !!localStorage.getItem("token");

    return hasJWT() ? children : <Navigate to="/login" replace />;
};

export default RouteGuard;