import React from "react";
import './Header.css';
import { NavLink } from "react-router-dom";
import logo from "../../images/pixlpark_logo.svg";


const Header = () => {
  return (
    <header className="header">
      <img className="header-logo" src={logo} alt="error image" />
      <div className="header-navigation" >
        {/* <NavLink to="/">Orders</NavLink> */}
        {/* <NavLink to="/blog">Blog</NavLink> */}
      </div>
    </header>
  );
};

export { Header };
