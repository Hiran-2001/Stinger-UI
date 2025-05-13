import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "./isTokenValid";

export function CustomerRoute() {
    const token = localStorage.getItem('token');
    const isValid = token && isTokenValid(token);
    return isValid ? <Outlet /> : <Navigate to="/login" replace />;
}

export function AdminRoute() {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('userRole') === "admin";
    const isValid = token && isTokenValid(token);

    return isValid && isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}