import React, { createContext, useState, useContext } from "react";
import { GlobalContextType } from "../../core/types/global.context.types";

const base = {
  paginationData: {
    currentPage: 1,
    totalPages: 1
  },
  pokemonsList: [],
  selectedPokemon: null,
  isDarkMode: false,
  autoCompletionList: [],
  favorites: []
}

export const GlobalContext = createContext<{
  data: GlobalContextType;
  setData: React.Dispatch<React.SetStateAction<GlobalContextType>>;
}>({
  data: base,
  setData: () => {
    throw new Error("setData function must be overridden");
  }
});

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<GlobalContextType>(base);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  const { data, setData } = context;

  const toggleFavorite = (pokemonId: string) => {
    setData(prev => ({
      ...prev,
      favorites: prev.favorites.includes(pokemonId)
        ? prev.favorites.filter(id => id !== pokemonId)
        : [...prev.favorites, pokemonId]
    }));
  };

  const isFavorite = (pokemonId: string) => {
    return data.favorites.includes(pokemonId);
  };

  return { data, setData, toggleFavorite, isFavorite };
}
