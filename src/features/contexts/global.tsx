import React, { createContext, useState, useContext } from "react";
import { GlobalContextType } from "../../core/types/global.context.types";

export const GlobalContext = createContext<{
  data: GlobalContextType;
  setData: React.Dispatch<React.SetStateAction<GlobalContextType>>;
}>({
  data: {
    paginationData: {
      currentPage: 1,
      totalPages: 1
    },
    pokemonsList: [],
    selectedPokemon: null,
    isDarkMode: false
  },
  setData: () => {
    throw new Error("setData function must be overridden");
  }
});

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<GlobalContextType>({
    paginationData: {
      currentPage: 1,
      totalPages: 1
    },
    pokemonsList: [],
    selectedPokemon: null,
    isDarkMode: false
  });

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  const { data, setData } = context;

  return { data, setData };
}

