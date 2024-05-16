import {
    HomeOutlined,
    UserOutlined,
    FormOutlined,
  } from "@ant-design/icons";
  import classNames from "classnames";
  import React, { useState, useEffect } from "react";
  import { useLocation, Link } from "react-router-dom";
  import "./sidebar.scss";
  
  const CustomeSidebar = ({ toggleCollapse }) => {
    const [menuSidebar, setMenuSidebar] = useState();
    const [currentRole, setCurrentRole] = useState();
    const location = useLocation();
  
    const menus = [
      {
        label: "Beranda",
        icon: <HomeOutlined />,
        link: "/management/dashboard",
        roles: [1, 2, 3, 4, 5],
      },
      {
        label: "Admin",
        icon: <UserOutlined />,
        link: "/management/admin",
        roles: [1, 2, 3, 4],
      },
      {
        label: "Order",
        icon: <FormOutlined />,
        link: "/management/order",
        roles: [1, 2, 3, 4, 5],
      },
    ];
  
    useEffect(() => {
      const roleId = window.localStorage.getItem("roleId");
      if (!roleId) {
        window.location.href = "/login";
      }
      setCurrentRole(roleId);
      setMenuSidebar(menus);
    }, []);
  
    const wrapperClasses = classNames(
      "h-screen px-4 pt-4 pb-4 bg-light flex justify-between flex-col fixed sidebar-wp",
      {
        ["w-60"]: !toggleCollapse,
        ["w-20"]: toggleCollapse,
      }
    );
  
    const getNavItemClasses = (menu) => {
      return classNames("flex items-center menu-wrapper", {
        ["active"]: location.pathname.includes(menu.link),
      });
    };
  
    return (
      <div
        className={wrapperClasses}
        style={{
          transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
          border: "2px solid #f3f3f3",
          zIndex: "9",
          backgroundColor: "#fff",
        }}
      >
        <div className="flex flex-col">
          {/* <img src={"/assets/images/user-donut.png"} className="logo" /> */}
  
          <div
            className="flex flex-col items-start mt-10"
            style={{ color: "#000" }}
          >
            {menuSidebar?.map(({ icon, ...menu }) => {
              const classes = getNavItemClasses(menu);
              return (
                <>
                  {menu.roles.includes(parseInt(currentRole)) && (
                    <div className={classes}>
                      <Link to={menu.link}>
                        <div className="flex py-4 px-3 items-center w-full h-full">
                          <div style={{ width: "2.5rem" }}>{icon}</div>
                          {!toggleCollapse && (
                            <span
                              className={classNames(
                                "text-md font-medium text-text-light"
                              )}
                            >
                              {menu.label}{" "}
                              {menu.roles.includes(parseInt(currentRole))}
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomeSidebar;
  