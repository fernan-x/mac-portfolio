import React from "react";

const PokemonCard = ({ id, name, image, types, setDisplayPokemon }) => {
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
