import React from 'react';
import './Header.css';
import HamburgerMenu from "./HamburgerMenu.jsx";
import { Link } from "react-router-dom";


function Header() {
    return (<div>
        <div className='top-div'>
            <span className='menu-span'>
                <HamburgerMenu />
            </span>
            <span className='Calcubud' >
                <Link to={"/"}><h1>Calcubud <span className="geek-emoji">🤓</span> </h1></Link>
            </span>
        </div>
    </div>
    );
}

export default Header;