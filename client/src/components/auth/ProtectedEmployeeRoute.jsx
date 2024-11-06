import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../../constants";

function ProtectedEmployeeRoute() {
    const isAuthenticated = !!Cookies.get(ACCESS_TOKEN);
    const location = useLocation();

    if (!isAuthenticated && location.pathname !== "/employee/login") {
        // Si no está autenticado y no está en la página de login, redirige al login
        return <Navigate to="/employee/login" state={{ from: location }} replace />;
    }

    if (isAuthenticated && location.pathname === "/admin/login") {
        // Si está autenticado y está en la página de login, redirige al dashboard
        return <Navigate to="/employee/dashboard/services" replace />;
    }

    // En cualquier otro caso, renderiza el contenido normal
    return <Outlet />;
}

export default ProtectedEmployeeRoute;