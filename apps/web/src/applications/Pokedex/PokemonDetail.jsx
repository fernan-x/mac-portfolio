import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { VscArrowLeft } from "react-icons/vsc";

import pokeball from "../../assets/images/Pokeball.svg";
import { useTranslation } from "react-i18next";
import heightLogo from "../../assets/images/applications/height.png";
import weightLogo from "../../assets/images/applications/weight.png";

const PokemonDetail = ({ handleBack, id }) => {
  const { t } = useTranslation(["app"]);

  const pokemonList = useSelector((state) => state.pokedex.pokemonList);
  const [detail, setDetail] = useState(null);
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [moves, setMoves] = useState([]);
  const [description, setDescription] = useState(
    "Description du pokemon sera ici :D"
  );

  useEffect(() => {
    const res = pokemonList.filter((elem) => elem.id === id);
    if (res.length > 0) {
      console.log(res[0]);
      setDetail(res[0]);
      setTypes(res[0].types);
      setName(res[0].name);
      setImage(res[0].image);
      setHeight(res[0].height);
      setWeight(res[0].weight);
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
          <h3>{t("app:pokemon-about")}</h3>
        </div>
        <div className="pokemon-detail__content-overview">
          <div className="overview">
            <div className="overview__value">
              <span className="overview__value-image">
                <img src={weightLogo} alt="weight" />
              </span>
              <span className="overview__value-number">{weight} kg</span>
            </div>
            <span className="overview__title">{t("app:pokemon-weight")}</span>
          </div>
          <div className="overview">
            <div className="overview__value">
              <span className="overview__value-image">
                <img src={heightLogo} alt="height" />
              </span>
              <span className="overview__value-number">{height} m</span>
            </div>
            <span className="overview__title">{t("app:pokemon-height")}</span>
          </div>
          <div className="overview">
            <span className="overview__value">{moves}</span>
            <span className="overview__title">{t("app:pokemon-moves")}</span>
          </div>
        </div>
        <div className="pokemon-detail__content-description">{description}</div>
      </div>
    </div>
  );
};

export default PokemonDetail;
