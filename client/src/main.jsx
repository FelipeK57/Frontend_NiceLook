import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource-variable/onest";
import "@fontsource/amaranth";
import {
  createBrowserRouter,
  // Navigate,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AdminLogin from "./pages/auth/admin/AdminLogin.jsx";
import ServicesManagement from "./pages/admin/ServicesManagement.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import EmployeesManagement from "./pages/admin/EmployeesManagement.jsx";
import AppointmentsManagement from "./pages/admin/AppointmentsManagement.jsx";
import FinancePanel from "./pages/admin/FinancePanel.jsx";
import ProductsManagement from "./pages/admin/ProductsManagement.jsx";
import EmployeeServicesManagement from "./pages/employee/ServicesManagement.jsx";
import EditProfilePage from "./pages/admin/EditProfilePage.jsx";
import SalesPanel from "./pages/recepcionist/SalesPanel.jsx";
import Appointments from "./pages/recepcionist/Appointments.jsx";
import EmployeeLogin from "./pages/auth/employee/EmployeeLogin.jsx";
import ProtectedEmployeeRoute from "./components/auth/ProtectedEmployeeRoute.jsx";
import ScheduleManagement from "./pages/employee/ScheduleManagement.jsx";
import RecordManagement from "./pages/employee/RecordManagement.jsx";
import ProtectedReceptionistRoute from "./components/auth/ProtectedReceptionistRoute.jsx";
import EstablishmentProfile from "./pages/EstablishmentProfile.jsx";
import HomePage from "./pages/HomePage.jsx";
import EmployeeProfile from "./pages/establishment/services/EmployeeProfile.jsx";
import TestComponents from "./TestComponents.jsx";
import ClientHistorial from "./components/client/clientHistorial.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/historialTest",
        element: <ClientHistorial />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/@peluqueriastylospalmira",
        element: <EstablishmentProfile />,
        errorElement: <div>Error Page</div>,
        children: [
          {
            path: "services",
            children: [
              {
                path: ":employeeId",
                element: <EmployeeProfile />,
                errorElement: <div>Error Page</div>,
              },
            ],
          },
          {
            path: "store",
            errorElement: <div>Error Page</div>,
          },
          {
            path: "reviews",
            errorElement: <div>Error Page</div>,
          },
          {
            path: "employees",
            errorElement: <div>Error Page</div>,
          },
          {
            path: "about",
            errorElement: <div>Error Page</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <div>Error Page</div>,
  },
  {
    path: "/services",
    element: <ServicesManagement />,
    errorElement: <div>Error Page</div>,
  },
  {
    path: "/employees",
    element: <EmployeesManagement />,
    errorElement: <div>Error Page</div>,
  },

  {
    path: "/EditProfilePage",
    element: <EditProfilePage />,
    errorElement: <div>Error Page</div>,
  },
  {
    path: "/services",
    element: <ServicesManagement />,
    errorElement: <div>Error Page</div>,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "home",
            index: true,
            element: <div>Dashboard</div>,
          },
          {
            path: "services",
            element: <ServicesManagement />,
          },
          {
            path: "products",
            element: <ProductsManagement />,
          },
          {
            path: "employees",
            element: <EmployeesManagement />,
          },
          {
            id: "admin-appointments",
            path: "appointments",
            element: <AppointmentsManagement />,
          },
          {
            id: "admin-finance",
            path: "finance",
            element: <FinancePanel />,
          },
          {
            id: "admin-edit-profile",
            path: "EditProfilePage",
            element: <EditProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/employee",
    element: <ProtectedEmployeeRoute />,
    children: [
      {
        id: "employee-login",
        path: "login",
        element: <EmployeeLogin />,
      },
      {
        id: "employee-dashboard",
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            id: "employee-services",
            path: "services",
            element: <EmployeeServicesManagement />,
          },
          {
            id: "employee-schedule",
            path: "schedule",
            element: <ScheduleManagement />,
          },
          {
            id: "employee-record",
            path: "record",
            element: <RecordManagement />,
          },
        ],
      },
    ],
  },
  {
    path: "/recepcionist",
    element: <ProtectedReceptionistRoute />,
    children: [
      {
        id: "recepcionist-dashboard",
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            id: "recepcionist-appointments",
            path: "appointments",
            element: <Appointments />,
          },
          {
            id: "recepcionist-finance",
            path: "finance",
            element: <SalesPanel />,
          },
        ],
      },
    ],
  },
  {
    path: "/test_components",
    element: <TestComponents />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="659540305448-65l2ttvn04541tpuke3c411nrocbupdv.apps.googleusercontent.com">
      <RouterProvider router={routes} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
