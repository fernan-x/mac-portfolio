import { useLayoutEffect, useRef, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useTranslation } from "react-i18next";

/* Store import */
import { usePokedexStore } from "../../store/pokedexStore";
import {
  getScrollParent,
  usePokemonPagination,
} from "../../hooks/usePokemonPagination";

import pokemonLoader from "../../assets/lotties/pokeball-loading.json";
import PokemonCard from "./PokemonCard";

import "./Pokedex.scss";
import PokemonDetail from "./PokemonDetail";

const Pokedex = () => {
  const { t } = useTranslation(["app"]);
  const pokemons = usePokedexStore((state) => state.pokemonList);
  const { loading, error, hasMore, sentinelRef, retry } =
    usePokemonPagination();
  const [displayPokemon, setDisplayPokemon] = useState<number | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const savedScroll = useRef(0);

  const openDetail = (id: number) => {
    const scroller = getScrollParent(listRef.current);
    savedScroll.current = scroller?.scrollTop ?? 0;
    setDisplayPokemon(id);
  };

  // Restore the list scroll position when coming back from a detail
  useLayoutEffect(() => {
    if (displayPokemon === null && listRef.current) {
      const scroller = getScrollParent(listRef.current);
      if (scroller) scroller.scrollTop = savedScroll.current;
    }
  }, [displayPokemon]);

  if (displayPokemon) {
    return (
      <PokemonDetail
        id={displayPokemon}
        handleBack={() => setDisplayPokemon(null)}
        onNavigate={setDisplayPokemon}
      />
    );
  }

  if (pokemons.length === 0 && !error) {
    return (
      <div className="pokedex__loader">
        <Player
          src={pokemonLoader}
          autoplay
          loop
          className="pokedex__loader-lottie"
        ></Player>
      </div>
    );
  }

  return (
    <>
      <div className="pokedex" ref={listRef}>
        {pokemons.map((elem) => (
          <PokemonCard
            key={elem.id}
            id={elem.id}
            name={elem.name}
            image={elem.image}
            types={elem.types}
            setDisplayPokemon={openDetail}
          />
        ))}
      </div>
      <div className="pokedex__footer">
        {loading && (
          <div
            className="pokedex__spinner"
            role="status"
            aria-label={t("app:pokemon-loading")}
          />
        )}
        {error && (
          <div className="pokedex__error" role="alert">
            <p>{t("app:pokemon-error")}</p>
            <button type="button" onClick={() => void retry()}>
              {t("app:pokemon-retry")}
            </button>
          </div>
        )}
        {hasMore && !loading && !error && (
          <div ref={sentinelRef} className="pokedex__sentinel" />
        )}
      </div>
    </>
  );
};

export default Pokedex;
