import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPokemons, POKEMON_PAGE_SIZE } from "../services/pokeapi";
import { usePokedexStore } from "../store/pokedexStore";

/** Closest ancestor that actually scrolls vertically (null = the viewport). */
export const getScrollParent = (node: HTMLElement | null): HTMLElement | null => {
  let parent = node?.parentElement ?? null;
  while (parent) {
    const { overflowY } = window.getComputedStyle(parent);
    if (/(auto|scroll|overlay)/.test(overflowY)) return parent;
    parent = parent.parentElement;
  }
  return null;
};

export const usePokemonPagination = (limit: number = POKEMON_PAGE_SIZE) => {
  const hasMore = usePokedexStore((state) => state.hasMore);
  const offset = usePokedexStore((state) => state.offset);
  const addPokemonPage = usePokedexStore((state) => state.addPokemonPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sentinel, setSentinel] = useState<HTMLElement | null>(null);
  // Synchronous guard against concurrent / duplicate requests
  const inFlight = useRef(false);

  const loadMore = useCallback(async () => {
    const state = usePokedexStore.getState();
    if (inFlight.current || !state.hasMore) return;
    inFlight.current = true;
    setLoading(true);
    setError(null);
    try {
      const items = await fetchPokemons({ limit, offset: state.offset });
      addPokemonPage(items, limit);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, [limit, addPokemonPage]);

  // First page, only when the store is still empty
  useEffect(() => {
    if (usePokedexStore.getState().pokemonList.length === 0) {
      void loadMore();
    }
  }, [loadMore]);

  // Observe the sentinel. The observer is recreated after every page so it
  // fires again when the sentinel is still visible (e.g. tall window).
  useEffect(() => {
    if (!sentinel || loading || error || !hasMore || offset === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadMore();
        }
      },
      { root: getScrollParent(sentinel), rootMargin: "0px 0px 100px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinel, loading, error, hasMore, offset, loadMore]);

  return {
    loading,
    error,
    hasMore,
    /** Callback ref to attach to the element at the bottom of the list */
    sentinelRef: setSentinel,
    retry: loadMore,
  };
};
