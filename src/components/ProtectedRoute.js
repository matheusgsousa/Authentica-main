import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../contexts/authContext";
const ProtectedRoute = ({ children }) => {
    const { user } = useUserAuth();

    console.log("Check user in Private: ", user);
    if (!user) {
        return <Navigate to="/Home" />;
    }
    return children;
};

export default ProtectedRoute;