import React from "react";
import Button from "../components/Elements/Button";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
      <p className="text-lg mb-8">Explore our products</p>
      <Link to="/products">
        <Button variant="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-4">
          View Products
        </Button>
      </Link>
    </div>
  );
};

export default WelcomePage;
