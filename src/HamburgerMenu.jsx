import { useState } from "react";
import './HamburgerMenu.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const HamburgerMenu = () => {
  // State to manage menu visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      {/* Hamburger Icon */}
      <i
        className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}
        onClick={toggleMenu}
        style={{ cursor: "pointer", fontSize: "24px" }}
      ></i>

      {/* Menu Content */}
      {isOpen && (
        <div className="menu">
          <ul>
            <Link to={"/"}>
              <li> <button>Home</button> </li>
            </Link>
            <Link to={"/about"}>
              <li><button>About Game</button></li>
            </Link>
            <Link to={"/contact"}>
              <li><button>Contact</button></li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
