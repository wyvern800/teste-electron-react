import { PokemonDetail, AutoCompletion } from '../../shared/services/pokemon.service';

interface PaginationData {
  currentPage: number;
  totalPages: number;
}

interface GlobalContextType {
  paginationData: PaginationData;
  pokemonsList?: PokemonDetail[];
  selectedPokemon?: PokemonDetail | null;
  autoCompletionList?: PokemonDetail[];
  isDarkMode: boolean;
  favorites: string[];
}

export { GlobalContextType };
