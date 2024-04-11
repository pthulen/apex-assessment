import { createContext, useState, useEffect } from "react";

// pokemonItem type
export type PokemonItem = {
  name: string;
  url: string;
};

export const PokemonContext = createContext({
  pokemonList: [] as PokemonItem[],
  setPokemonList: (value: PokemonItem[]) => {},
});

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);

  const value = {
    pokemonList,
    setPokemonList: (value: PokemonItem[]) => setPokemonList(value),
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, []);

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
