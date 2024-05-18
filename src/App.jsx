import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from "./pages/Management/Admin";
import Dashboard from "./pages/Management/Dashboard"
import Layout from "./components/Admin/Layout";
import LoginPage from "./pages/login";
import Menu from "./pages/Management/Menu";
import MenuCategories from "./pages/Management/MenuCategories";
import RegisterPage from "./pages/register";
import ErrorPage from "./pages/404";
import ProductsPage from "./pages/product";
import ProfilePage from "./pages/profile";
import DetailProductPage from "./pages/detailProduct";
import PaymentPage from "./pages/payment";
import Order from "./pages/Management/Order"
import WelcomePage from "./pages/welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/product/:id",
    element: <DetailProductPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "management",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "admin",
        element: <Admin />
      },
      {
        path: "menu-category",
        element: <MenuCategories />
      },
      {
        path: "list-menu",
        element: <Menu />
      },
      {
        path: "order",
        element: <Order />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
