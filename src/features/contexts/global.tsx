import React, { createContext, useState } from "react";
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
    pokemonsList: null,
    selectedPokemon: null
  },
  setData: () => {
    throw new Error("setData function must be overridden");
  }
});

function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<GlobalContextType>({
    paginationData: {
      currentPage: 1,
      totalPages: 1
    },
    pokemonsList: null,
    selectedPokemon: null
  });

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
