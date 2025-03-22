import { Navigate, Outlet } from "react-router-dom";

export function CustomerRoute() {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export function AdminRoute() {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('userRole') === "admin";

    return token && isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}