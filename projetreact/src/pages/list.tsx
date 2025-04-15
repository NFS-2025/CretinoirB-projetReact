import React, { useState, useEffect } from "react";
import "./PokemonList.css"; // 👈 n'oublie pas ça !

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: Pokemon[];
}

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const data: PokemonListResponse = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const getSpriteUrl = (url: string) => {
    const id = url.split("/").filter(Boolean).pop(); 
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Pokémon List</h1>
      <div className="pokemon-container">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <img
              src={getSpriteUrl(pokemon.url)}
              alt={pokemon.name}
              className="pokemon-img"
            />
            <div className="pokemon-name">{pokemon.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
