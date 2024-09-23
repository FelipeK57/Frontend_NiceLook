import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  // Navigate,
  RouterProvider,
} from "react-router-dom";
import AdminLogin from "./pages/auth/admin/AdminLogin.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error Page</div>,
  },
  {
    path: "/admin",
    // element: <Navigate to="./login"/>,
    children: [
      {
        id: "admin-login",
        path: "login",
        element: <AdminLogin />,
      },
      {
        id: "admin-dashboard",
        path: "dashboard",
        element: <div>Dashboard Page</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
