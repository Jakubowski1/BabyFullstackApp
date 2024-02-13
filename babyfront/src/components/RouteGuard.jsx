import React from 'react';
import { Navigate } from '../../node_modules/react-router-dom/dist/index';

const RouteGuard = ({ children }) => {
    const hasJWT = () => !!localStorage.getItem("token");

    return hasJWT() ? children : <Navigate to="/badrequest" replace />;
};

export default RouteGuard;