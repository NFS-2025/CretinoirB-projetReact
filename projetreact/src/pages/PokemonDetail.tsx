import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonCard.css";

interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  height: number;
  weight: number;
}

const PokemonDetail: React.FC = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Erreur de chargement du Pokémon :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return <div>Chargement...</div>;
  if (!pokemon) return <div>Pokémon introuvable.</div>;

  return (
    <div className="pokemon-detail-container">
      <div className="pokemon-detail-card">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-img"
        />
        <div className="pokemon-name">{pokemon.name}</div>

        <div className="pokemon-details">
          <p>
            <strong>Type(s):</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Taille:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Poids:</strong> {pokemon.weight / 10} kg
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
