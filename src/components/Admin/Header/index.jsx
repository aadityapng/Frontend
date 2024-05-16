import { MenuFoldOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useEffect, useState } from "react";
import { message } from "antd";

const Header = ({ handleSidebarToggle }) => {
  // const userRole = getCookie("roles");
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState("");

  const handleMenu = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const handleLogout = async () => {
    message.success({
      content: "Logout Success",
    });
    window.location.href = "/login";
  };
  return (
    <div className="flex justify-between align-center mb-8 p-4 header-wp">
      <button onClick={handleSidebarToggle} className="btn-collapse">
        <MenuFoldOutlined />
      </button>
      <div className="profile-wp" onClick={handleMenu}>
        <p className="mr-4">{user}</p>
        <div className="img-wp">
          <img src={"/assets/images/user-donut.png"} className="logo" />
        </div>
      </div>
      <div className={`menu-profile ${isActive && "active"}`}>
        <div className="title-menu" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Header;
