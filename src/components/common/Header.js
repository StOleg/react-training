import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="nav nav-tabs">
            <li className="nav-item">
                <NavLink exact to="/" className="nav-link" activeClassName="active">Main</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
            </li>
        </nav>
    );
};

export default Header;