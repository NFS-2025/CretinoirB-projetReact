import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navigation: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Pokédex</h2>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/" className="nav-link">Pokémon List</Link>
                </li>
                <li>
                    <Link to="/about" className="nav-link">About</Link>
                </li>
                <li>
                    <Link to="pokeList" className="nav-link">List</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
