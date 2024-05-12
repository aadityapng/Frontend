import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ErrorPage from "./pages/404";
import ProductsPage from "./pages/product";
import ProfilePage from "./pages/profile";
import DetailProductPage from "./pages/detailProduct";
import PaymentPage from "./pages/payment";
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
