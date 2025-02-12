interface PaginationData {
  currentPage: number;
  totalPages: number;
}

interface GlobalContextType {
  paginationData: PaginationData;
  pokemonsList: any;
  selectedPokemon: any;
}

export { GlobalContextType };
