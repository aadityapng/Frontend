import React, { useContext } from "react";
// import Button from "../Elements/Button";
import { useLogin } from "../../hooks/useLogin";
import { DarkMode } from "../../context/DarkMode";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const Navbar = () => {
  const username = useLogin();
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  // };

  return (
    <nav
      className={`${
        isDarkMode ? "bg-black" : "bg-gray-500"
      } text-white py-2 px-6 flex items-center justify-between`}
    >
      <div className="text-xl font-bold">Restaurant Self-Service</div>
      <div className="flex items-center font-bold">
        <span className="mr-4">Welcome, {username}</span>
        {/* <Button
          variant="bg-red-500 hover:bg-red-700 text-white rounded-md py-2 px-4"
          onClick={handleLogout}
        >
          Logout
        </Button> */}
        <button
          className="p-1 bg-black rounded ml-2"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <IoSunnyOutline /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
