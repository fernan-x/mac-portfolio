import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { VscArrowLeft } from "react-icons/vsc";

import pokeball from "../../assets/images/Pokeball.svg";

const PokemonDetail = ({ handleBack, id }) => {
  const pokemonList = useSelector((state) => state.pokedex.pokemonList);
  const [detail, setDetail] = useState(null);
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const res = pokemonList.filter((elem) => elem.id === id);
    if (res.length > 0) {
      setDetail(res[0]);
      setTypes(res[0].types);
      setName(res[0].name);
      setImage(res[0].image);
    }
  }, [pokemonList]);

  return (
    <div
      className={`pokemon-detail type-${
        types.length > 0 ? types[0]["name"] : "unknown"
      }`}
    >
      <div className="pokemon-detail__header">
        <span className="pokemon-detail__header-back" onClick={handleBack}>
          <VscArrowLeft />
        </span>
        <span className="pokemon-detail__header-title">{name}</span>
        <span className="pokemon-detail__header-number">{`#${id
          .toString()
          .padStart(3, "0")}`}</span>
      </div>
      <img src={pokeball} alt="pokeball" />
      <div className="pokemon-detail__content">
        <div className="pokemon-detail__content-image">
          <img src={image} alt="pokemon" />
        </div>
        <div className="pokemon-detail__content-types">
          {types.map((item, idx) => (
            <span key={idx} className={`type-span type-span-${item.name}`}>
              {item.name}
            </span>
          ))}
        </div>
        <div className="pokemon-detail__content-about">
          <h3>About</h3>
        </div>
        {JSON.stringify(detail)}
      </div>
    </div>
  );
};

export default PokemonDetail;
