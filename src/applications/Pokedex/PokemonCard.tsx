import React from "react";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: { name: string }[];
  setDisplayPokemon: (id: number) => void;
}

const PokemonCard = ({
  id,
  name,
  image,
  types,
  setDisplayPokemon,
}: PokemonCardProps) => {
  return (
    <div
      className={`pokemon-card type-${types[0]["name"]}`}
      onClick={() => setDisplayPokemon(id)}
    >
      <div className="pokemon-card__image">
        <img src={image} alt={name} />
        <span className="pokemon-card__image-number">{`#${id
          .toString()
          .padStart(3, "0")}`}</span>
      </div>
      <div className="pokemon-card__name">{name}</div>
    </div>
  );
};

export default PokemonCard;
