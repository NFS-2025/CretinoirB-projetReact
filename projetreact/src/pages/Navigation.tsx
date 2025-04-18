import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import "../pages/NavBar.css";

const Navigation: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
      <Link to="/welcome" className="nav-link">
            Pokédex
          </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/pokemonList" className="nav-link">
            PokémonList
          </Link>
        </li>
        <li>
          <Link to="/pokeList" className="nav-link">
            List
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ marginLeft: 2 }}
            >
              Se déconnecter
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
