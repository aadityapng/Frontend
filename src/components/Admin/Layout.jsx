import React, { ReactNode, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./Footer";
import Header from "./Header";
import CustomeSidebar from "./Sidebar";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div className="h-screen flex flex-row justify-start" style={{backgroundColor: 'white'}}>
      <CustomeSidebar toggleCollapse={toggleCollapse} />
      <div
        className={`${toggleCollapse ? "ml-24" : "ml-60"}`}
        style={{ width: "100%" }}
      >
        <Header handleSidebarToggle={handleSidebarToggle} />
        <div
          className="p-4 "
          style={{ width: "100%", minHeight: "calc(100vh - 105px)" }}
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
