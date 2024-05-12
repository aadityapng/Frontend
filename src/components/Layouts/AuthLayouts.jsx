import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const AuthLayouts = (props) => {
  const { children, title, type } = props;
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  return (
    <div className={`flex justify-center min-h-screen items-center bg-slate-100 ${isDarkMode && "bg-slate-900"}`}>
      <div className={`w-full max-w-xs border-2 ${isDarkMode ? "border-slate-700" : "border-gray-300"} rounded-md shadow-lg p-5 bg-white ${isDarkMode ? "bg-slate-500" : ""}`}>
        <button className="absolute top-5 right-5 p-1 bg-slate-400 rounded" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <IoSunnyOutline /> : <FaMoon />}
        </button>
        <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-blue-900" : "text-blue-600"} text-center`}>
          {title}
        </h1>
        <p className={`font-small ${isDarkMode ? "text-white" : "text-gray-500"} mb-8 text-center`}>
          Please enter your details
        </p>
        {children}
        <p className="text-sm mt-3 text-center">
          {type === "login"
            ? "Don't have an account? "
            : "Already heve an account? "}

          {type === "login" && (
            <Link to="/register" className={`${isDarkMode ? "text-blue-900" : "text-blue-500"} font-bold`}>
              Register
            </Link>
          )}

          {type === "register" && (
            <Link to="/login" className={`${isDarkMode ? "text-blue-900" : "text-blue-500"} font-bold`}>
              Login
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthLayouts;
