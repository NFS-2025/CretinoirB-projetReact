import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

interface Pokemon {
  name: string;
  url: string;
}

const getSpriteUrl = (url: string) => {
  const id = url.split("/").filter(Boolean).pop();
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="pokemon-container">
      {pokemons.map((pokemon) => (
        <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
          <div className="pokemon-card">
            <img
              src={getSpriteUrl(pokemon.url)}
              alt={pokemon.name}
              className="pokemon-img"
            />
            <div className="pokemon-name">{pokemon.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
