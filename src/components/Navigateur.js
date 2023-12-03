import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navigateur.css";
import logo from "../img/logo.png";
import { NavLink } from "react-router-dom";

function Navigateur() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div>
      <nav className={menuOpen ? "open" : ""}>
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        <div className="navbar"></div>

        <ul>
          <li>
            <NavLink to="/connexion" onClick={toggleMenu}>
              Connexion
            </NavLink>
          </li>
          <li>
            <NavLink to="/creation" onClick={toggleMenu}>
              S'inscrire
            </NavLink>
          </li>
        </ul>

        <button id="menuButton" onClick={toggleMenu}>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
        </button>
      </nav>
    </div>
  );
}

export default Navigateur;
