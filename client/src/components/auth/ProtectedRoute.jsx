import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../../constants";

const ProtectedRoute = () => {
  const isAuthenticated = !!Cookies.get(ACCESS_TOKEN);
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== "/admin/login") {
    // Si no está autenticado y no está en la página de login, redirige al login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && location.pathname === "/admin/login") {
    // Si está autenticado y está en la página de login, redirige al dashboard
    return <Navigate to="/admin/dashboard/finance" replace />;
  }

  // En cualquier otro caso, renderiza el contenido normal
  return <Outlet />;
};

export default ProtectedRoute;