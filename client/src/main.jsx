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

import { ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "@/pages/NotFound.jsx";

import AdminLogin from "./pages/auth/admin/AdminLogin.jsx";
import ServicesManagement from "./pages/admin/ServicesManagement.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import EmployeesManagement from "./pages/admin/EmployeesManagement.jsx";
import AppointmentsManagement from "./pages/admin/AppointmentsManagement.jsx";
import FinancePanel from "./pages/admin/FinancePanel.jsx";
import ProductsManagement from "./pages/admin/ProductsManagement.jsx";
import EditProfilePage from "./pages/admin/EditProfilePage.jsx";
import SalesPanel from "./pages/recepcionist/SalesPanel.jsx";
import Appointments from "./pages/recepcionist/Appointments.jsx";
import EmployeeLogin from "./pages/auth/employee/EmployeeLogin.jsx";
import ProtectedEmployeeRoute from "./components/auth/ProtectedEmployeeRoute.jsx";
import ProtectedReceptionistRoute from "./components/auth/ProtectedReceptionistRoute.jsx";
import EstablishmentProfile from "./pages/EstablishmentProfile.jsx";
import HomePage from "./pages/HomePage.jsx";
import EmployeeProfile from "./pages/establishment/services/EmployeeProfile.jsx";
import TestComponents from "./TestComponents.jsx";
import ClientHistorial from "./components/client/ClientHistorial.jsx";
import ShoppingCart from "./pages/buyPage/ShopingCart.jsx";
import AppointmentsHistory from "./pages/employee/AppointmentsHistory.jsx";
import ScheduleAppointment from "./pages/employee/ScheduleAppointment.jsx";
import ServiceProfessional from "./pages/employee/ServicesProfessional.jsx";
import ReviewsEstablishment from "./pages/establishment/ReviewsEstablishment.jsx";
import CustomerAppointments from "@/pages/customer/CustomerAppointments.jsx";
import TimesManagement from "./pages/employee/TimesManagement.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <NotFound />,
      },
      {
        path: "/profile",
        element: <ClientHistorial />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "appointments",
        element: <CustomerAppointments />,
        errorElement: <NotFound />,
      },
      {
        path: "/@peluqueriastylospalmira",
        element: <EstablishmentProfile />,
        errorElement: <NotFound />,
        children: [
          {
            path: "services",
            children: [
              {
                path: ":employeeId",
                element: <EmployeeProfile />,
                errorElement: <NotFound />,
              },
            ],
          },
          {
            path: "store",
            errorElement: <NotFound />,
          },
          {
            path: "reviews",
            errorElement: <NotFound />,
          },
          {
            path: "employees",
            errorElement: <NotFound />,
          },
          {
            path: "about",
            errorElement: <NotFound />,
          },
        ],
      },
      {
        path: "/shoppingCart",
        element: <ShoppingCart />,
        errorElement: <div>Error Page</div>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/services",
    element: <ServicesManagement />,
    errorElement: <NotFound />,
  },
  {
    path: "/employees",
    element: <EmployeesManagement />,
    errorElement: <NotFound />,
  },

  {
    path: "/EditProfilePage",
    element: <EditProfilePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/reviews",
    element: <ReviewsEstablishment />,
  },
  {
    path: "/services",
    element: <ServicesManagement />,
    errorElement: <NotFound />,
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
            path: "professionals",
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
            element: <ServiceProfessional />,
          },
          {
            path: "management",
            element: <TimesManagement />,
          },
          {
            id: "employee-schedule",
            path: "schedule",
            element: <ScheduleAppointment />,
          },
          {
            id: "employee-record",
            path: "record",
            element: <AppointmentsHistory />,
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

const slide = cssTransition({
  enter: "slide-top",
  exit: "slide-bottom",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <RouterProvider router={routes} />
      <ToastContainer
        pauseOnFocusLoss
        pauseOnHover
        position="bottom-right"
        transition={slide}
        limit={4}
      />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
