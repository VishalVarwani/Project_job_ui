import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "../header/header.css";
import {  FiUser } from 'react-icons/fi';

export default function Headerjs() {
  const [showMenu, setShowMenu] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfileSidebar = () => {
    setIsProfileOpen(!isProfileOpen);
  };


  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };

  return (
    <div className="Parentclass">
      <header className="headerhome">
        <nav className="nav container">
      
          <div className="nav__logo">JOBSCANNER</div>


          <div
            className={`nav__menu ${showMenu ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                  Help
                </NavLink>
              </li>
              
              <li className="nav__item">
                <NavLink
                  to="/location"
                  className="nav__link"
                  onClick={closeMenuOnMobile}
                >
                  Logout
                </NavLink>
              </li>
              <li>
             <li className="">
  <a  style={{color:"black", marginTop:5}}className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <FiUser size={20} color="black"/>
 </a>
  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <div className="dropdown-divider" />
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</li>


              </li>
              {/* <li className="nav__item">
                <NavLink
                  to="/get-started"
                  className="nav__link nav__cta"
                  onClick={closeMenuOnMobile}
                >
                  Get Started
                </NavLink>
              </li> */}
            </ul>
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>

          {!showMenu && (
            <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
              <IoMenu />
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
