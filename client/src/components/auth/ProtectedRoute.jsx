import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
// import { ACCESS_TOKEN } from "../../../constants";

const ProtectedRoute = () => {
  // const isAuthenticated = !!Cookies.get(ACCESS_TOKEN);

  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
