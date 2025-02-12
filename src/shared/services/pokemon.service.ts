import { apiService } from "./api.service";

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}

interface AutoCompletion {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDetail[];
}

class PokemonService {
  private static instance: PokemonService;
  private axios = apiService.getAxiosInstance();

  public static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService();
    }
    return PokemonService.instance;
  }

  /**
   * getPokemonList
   *
   * @param page The page number
   * @param limit The number of items per page
   * @returns Returns a list of Pokemon
   */
  public async getPokemonList(
    page = 1,
    limit = 20
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonDetail[];
  }> {
    const offset = (page - 1) * limit;
    const response = await this.axios.get<PokemonListResponse>(
      `/pokemon?offset=${offset}&limit=${limit}`
    );

    // Fetch detailed information for each Pokemon
    const detailedResults = await Promise.all(
      response.data.results.map((pokemon) =>
        this.getPokemonDetail(pokemon.name)
      )
    );

    return {
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      results: detailedResults,
    };
  }

  /**
   * getPokemonDetail
   *
   * @param nameOrId Pokemon name or ID
   * @returns Returns the detail of a Pokemon
   */
  public async getPokemonDetail(
    nameOrId: string | number
  ): Promise<PokemonDetail> {
    const response = await this.axios.get<PokemonDetail>(
      `/pokemon/${nameOrId}`
    );
    return response.data;
  }

  /**
   * buildAutoComplete
   *
   * @returns Returns a list of Pokemon for auto-completion
   */
  public async buildAutoComplete(): Promise<AutoCompletion> {
    const response = await this.getPokemonList(undefined, 2000);
    return response;
  }
}

export const pokemonService = PokemonService.getInstance();
export type { PokemonListResponse, PokemonDetail, AutoCompletion };
