import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { usePokedexStore } from "../../store/pokedexStore";
import { fetchPokemonDetail } from "../../services/pokeapi";
import {
  STAT_ORDER,
  formatAbilityName,
  formatHeight,
  formatPokemonNumber,
  formatWeight,
  padNumber,
  statLabel,
  statPercent,
} from "../../utils/pokemon";

import arrowBack from "../../assets/images/applications/arrow_back.svg";
import chevronLeft from "../../assets/images/applications/chevron_left.svg";
import chevronRight from "../../assets/images/applications/chevron_right.svg";
import weightIcon from "../../assets/images/applications/weight.svg";
import straightenIcon from "../../assets/images/applications/straighten.svg";
import pokeball from "../../assets/images/applications/pokeball.svg";

interface PokemonDetailProps {
  handleBack: () => void;
  /** Navigate to another pokemon of the loaded list (prev / next) */
  onNavigate: (id: number) => void;
  id: number;
}

const artworkUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const PokemonDetail = ({ handleBack, onNavigate, id }: PokemonDetailProps) => {
  const { t, i18n } = useTranslation(["app"]);

  const pokemonList = usePokedexStore((state) => state.pokemonList);
  const detail = usePokedexStore((state) => state.details[id]);
  const setPokemonDetail = usePokedexStore((state) => state.setPokemonDetail);

  const [failure, setFailure] = useState<{ id: number } | null>(null);
  const [attempt, setAttempt] = useState(0);

  const index = pokemonList.findIndex((elem) => elem.id === id);
  const pokemon = index >= 0 ? pokemonList[index] : undefined;
  const previousId = index > 0 ? pokemonList[index - 1].id : null;
  const nextId =
    index >= 0 && index < pokemonList.length - 1
      ? pokemonList[index + 1].id
      : null;

  // Only fetch what is not already cached in the store
  useEffect(() => {
    if (usePokedexStore.getState().details[id]) return;
    let cancelled = false;
    fetchPokemonDetail(id)
      .then((data) => {
        if (!cancelled) setPokemonDetail(data);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setFailure({ id });
      });
    return () => {
      cancelled = true;
    };
  }, [id, attempt, setPokemonDetail]);

  const hasError = !detail && failure?.id === id;
  const isLoading = !detail && !hasError;

  const retry = () => {
    setFailure(null);
    setAttempt((value) => value + 1);
  };

  const statsByName = new Map(
    (detail?.stats ?? []).map((stat) => [stat.name, stat.value]),
  );

  const typeName = pokemon?.types[0]?.name ?? "unknown";

  return (
    <div className={`pokemon-detail type-${typeName}`}>
      <img
        className="pokemon-detail__watermark"
        src={pokeball}
        width={208}
        height={208}
        alt=""
        aria-hidden="true"
      />
      <div className="pokemon-detail__header">
        <button
          type="button"
          className="pokemon-detail__header-back"
          onClick={handleBack}
          aria-label={t("app:pokemon-back")}
        >
          <img src={arrowBack} width={32} height={32} alt="" />
        </button>
        <h1 className="pokemon-detail__header-title">{pokemon?.name}</h1>
        <span className="pokemon-detail__header-number">
          {formatPokemonNumber(id)}
        </span>
      </div>

      <div className="pokemon-detail__image">
        <button
          type="button"
          className="pokemon-detail__nav"
          onClick={() => previousId !== null && onNavigate(previousId)}
          disabled={previousId === null}
          aria-label={t("app:pokemon-previous")}
        >
          <img src={chevronLeft} width={24} height={24} alt="" />
        </button>
        <button
          type="button"
          className="pokemon-detail__nav"
          onClick={() => nextId !== null && onNavigate(nextId)}
          disabled={nextId === null}
          aria-label={t("app:pokemon-next")}
        >
          <img src={chevronRight} width={24} height={24} alt="" />
        </button>
        <img
          className="pokemon-detail__image-artwork"
          src={artworkUrl(id)}
          width={200}
          height={200}
          alt={pokemon?.name ?? ""}
        />
      </div>

      <div className="pokemon-detail__content">
        <div className="pokemon-detail__content-types">
          {pokemon?.types.map((item) => (
            <span key={item.name} className={`type-span type-span-${item.name}`}>
              {item.name}
            </span>
          ))}
        </div>

        <h2 className="pokemon-detail__title">{t("app:pokemon-about")}</h2>

        <div className="pokemon-detail__content-overview">
          <div className="overview">
            <div className="overview__value">
              <img src={weightIcon} width={16} height={16} alt="" />
              <span className="overview__value-number">
                {formatWeight(pokemon?.weight ?? null, i18n.language)}
              </span>
            </div>
            <span className="overview__title">{t("app:pokemon-weight")}</span>
          </div>
          <div className="overview">
            <div className="overview__value">
              <img src={straightenIcon} width={16} height={16} alt="" />
              <span className="overview__value-number">
                {formatHeight(pokemon?.height ?? null, i18n.language)}
              </span>
            </div>
            <span className="overview__title">{t("app:pokemon-height")}</span>
          </div>
          <div className="overview">
            <div className="overview__value overview__value--abilities">
              {isLoading ? (
                <span className="skeleton skeleton--text" aria-hidden="true" />
              ) : (
                detail?.abilities.map((ability) => (
                  <span key={ability} className="overview__value-number">
                    {formatAbilityName(ability)}
                  </span>
                ))
              )}
            </div>
            <span className="overview__title">
              {t("app:pokemon-abilities")}
            </span>
          </div>
        </div>

        {hasError ? (
          <div className="pokemon-detail__error" role="alert">
            <p>{t("app:pokemon-error")}</p>
            <button type="button" onClick={retry}>
              {t("app:pokemon-retry")}
            </button>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div
                className="pokemon-detail__skeleton"
                role="status"
                aria-label={t("app:pokemon-loading")}
              >
                <span className="skeleton skeleton--text" />
                <span className="skeleton skeleton--text" />
                <span className="skeleton skeleton--text skeleton--short" />
              </div>
            ) : (
              <p className="pokemon-detail__content-description">
                {detail?.description}
              </p>
            )}

            <h2 className="pokemon-detail__title">
              {t("app:pokemon-base-stats")}
            </h2>
            <div className="pokemon-stats">
              <div className="pokemon-stats__labels">
                {STAT_ORDER.map((name) => (
                  <span key={name}>{statLabel(name)}</span>
                ))}
              </div>
              <div className="pokemon-stats__divider" />
              <div className="pokemon-stats__values">
                {STAT_ORDER.map((name) => (
                  <span key={name}>
                    {statsByName.has(name)
                      ? padNumber(statsByName.get(name) ?? 0)
                      : "---"}
                  </span>
                ))}
              </div>
              <div className="pokemon-stats__charts">
                {STAT_ORDER.map((name) => (
                  <div className="pokemon-stats__chart" key={name}>
                    <div className="pokemon-stats__bar-track" />
                    <div
                      className="pokemon-stats__bar-value"
                      style={{
                        width: `${statPercent(statsByName.get(name) ?? 0)}%`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
