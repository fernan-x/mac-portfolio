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
    <button
      type="button"
      className={`pokemon-card type-${types[0]?.name ?? "unknown"}`}
      onClick={() => setDisplayPokemon(id)}
      aria-label={`${name} #${id}`}
    >
      <span className="pokemon-card__image">
        {/* Fixed size: keeps the layout stable before the sprite loads, which
            the infinite scroll sentinel relies on */}
        <img src={image} alt="" width={96} height={96} />
        <span className="pokemon-card__image-number">{`#${id
          .toString()
          .padStart(3, "0")}`}</span>
      </span>
      <span className="pokemon-card__name">{name}</span>
    </button>
  );
};

export default PokemonCard;
