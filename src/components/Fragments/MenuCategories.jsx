import React, { useContext } from "react";
import { PiBowlFoodLight } from "react-icons/pi";
import { RiDrinks2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";

const MenuCategories = () => {
  const { isDarkMode } = useContext(DarkMode);

  return (
    <ul className={`menu ${isDarkMode ? "bg-slate-500" : "bg-white"} w-full p-0 mt-5 [&_li>*]:rounded-none`}>
      <li className="border">
        <Link className="flex items-center font-bold">
          <PiBowlFoodLight className="w-6 h-6 mr-1" />
          <span className="text-base">Food</span>
        </Link>
      </li>
      <li className="border">
        <Link className="flex items-center font-bold">
          <RiDrinks2Line className="w-6 h-6 mr-1" />
          <span className="text-base">Drink</span>
        </Link>
      </li>
    </ul>
  );
};

export default MenuCategories;
