import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>MyApp</h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/connectfour">Connect Four</Link>
        </li>
        <li>
          <Link to="/tictactoe">Tic Tac Toe</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
