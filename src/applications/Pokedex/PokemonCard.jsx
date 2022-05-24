import React from "react";

const PokemonCard = ({ id, name, image, types }) => {
  return (
    <div className={`pokemon-card type-${types[0]["name"]}`}>
      <div className="pokemon-card__inner">
        <div className="pokemon-card__inner-front">
          <div className="pokemon-card__image">
            <img src={image} alt={name} />
            <span className="pokemon-card__image-number">{`#${id
              .toString()
              .padStart(3, "0")}`}</span>
          </div>
          <div className="pokemon-card__name">{name}</div>
        </div>
        <div className="pokemon-card__inner-back">
          <span>test</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
