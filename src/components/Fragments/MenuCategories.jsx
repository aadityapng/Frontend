import React, { useContext } from "react";
import { PiBowlFoodLight } from "react-icons/pi";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { RiDrinks2Line } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";

const MenuCategories = ({ categories, onCategoryClick }) => {
  const { isDarkMode } = useContext(DarkMode);

  const handleCategoryClick = (category) => {
    onCategoryClick(category.nama);
  };

  const getIconForCategory = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "makanan":
        return <PiBowlFoodLight className="w-6 h-6 mr-1" />;
      case "minuman":
        return <RiDrinks2Line className="w-6 h-6 mr-1" />;
      case "cemilan":
        return <IoFastFoodOutline className="w-6 h-6 mr-1" />;
      default:
        return <MdOutlineEmojiFoodBeverage className="w-6 h-6 mr-1" />;
    }
  };

  return (
    <ul
      className={`menu ${
        isDarkMode ? "bg-slate-500" : "bg-white"
      } w-full p-0 mt-5 [&_li>*]:rounded-none`}
    >
      {categories.map((category) => (
        <li key={category.id} className="border">
          <Link
            className="flex items-center font-bold"
            onClick={() => handleCategoryClick(category)}
          >
            {getIconForCategory(category.nama)}
            <span className="text-base">{category.nama}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuCategories;
