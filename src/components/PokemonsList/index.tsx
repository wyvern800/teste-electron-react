import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  pokemonService,
  PokemonDetail,
} from "../../shared/services/pokemon.service";
import { useGlobalContext } from "../../features/contexts/global";
import { mainLogger as logger } from "../../shared/services/logger.service";
import {
  Container,
  Grid,
  Card,
  PokemonImage,
  PokemonName,
  TypesContainer,
  SearchContainer,
  SearchInput,
  AutocompleteResults,
  SearchWrapper,
  ThemeToggleButton,
} from "./style";
import AutocompleteItem from "../AutocompleteItem";
import { Badge } from "../Badge";
import Loading from "../Loading";
import PokemonModal from "../PokemonModal";
import { getBadgeColorByType, getEmojiByBadgeName } from "../../shared/utils";
import { FaMoon } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";

const PokemonsList: React.FC = () => {
  const { data, setData } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState<
    PokemonDetail[]
  >([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const loadMoreRef = useRef(null);

  const fetchPokemonWithEvolutions = async (id: number) => {
    const pokemonDetails = await pokemonService.getPokemonDetail(id);
    setData((prevState) => ({
      ...prevState,
      selectedPokemon: pokemonDetails,
    }));
  };

  /**
   * Fetches a page of Pokemon data from the API
   * Updates the global state with new Pokemon data and pagination information
   * @param page - The page number to fetch
   */
  const fetchPokemons = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        const response = await pokemonService.getPokemonList(page);

        setData((prevState) => ({
          ...prevState,
          pokemonsList:
            page === 1
              ? response.results
              : [...(prevState.pokemonsList || []), ...response.results],
          paginationData: {
            currentPage: page,
            totalPages: Math.ceil(response.count / 20),
          },
        }));
        logger.info("Pokemons list fetched successfully", response);
      } catch (error: unknown) {
        logger.error("Error fetching pokemons", error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [setData]
  );

  useEffect(() => {
    fetchPokemons(1);
  }, [fetchPokemons]);

  // Load autocomplete data on first render
  useEffect(() => {
    const fetchAutoCompletion = async () => {
      const autoComplete = await pokemonService.buildAutoComplete();

      // populate autocomplete list when we have results
      setData((prevState) => ({
        ...prevState,
        autoCompletionList: autoComplete.results,
      }));
    };
    fetchAutoCompletion();
  }, []);

  // Infinite scrolling implementation using Intersection Observer
  useEffect(() => {
    // Create an observer that triggers when the load more element becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Load more Pokemon when the element is visible, not already loading, and there are more pages
        if (
          entry.isIntersecting &&
          !isLoading &&
          data.paginationData?.currentPage < data.paginationData?.totalPages
        ) {
          fetchPokemons(data.paginationData.currentPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchPokemons, data.paginationData, isLoading]);

  if (!data.pokemonsList && !isLoading) {
    return <Loading />;
  }

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.length >= 2) {
      try {
        const autoCompletionList = data.autoCompletionList ?? [];
        const filteredResults = autoCompletionList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(value.toLowerCase())
        );
        setAutocompleteResults(filteredResults);
        setShowAutocomplete(true);
      } catch (error) {
        logger.error("Error fetching autocomplete results", error as Error);
      }
    } else {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showAutocomplete &&
        !(event.target as HTMLElement).closest(".autocomplete")
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAutocomplete]);

  const toggleTheme = () => {
    setData(prevState => ({
      ...prevState,
      isDarkMode: !prevState.isDarkMode
    }));
  };

  return (
    <Container isDark={data.isDarkMode}>
      <SearchWrapper isDark={data.isDarkMode}>
        <SearchContainer className="autocomplete" isDark={data.isDarkMode}>
        <SearchInput
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          isDark={data.isDarkMode}
        />
        {showAutocomplete && autocompleteResults.length > 0 && (
          <AutocompleteResults isDark={data.isDarkMode}>
            {autocompleteResults.map((pokemon) => (
              <AutocompleteItem
                key={pokemon.id}
                pokemon={pokemon}
                onClick={() => {
                  fetchPokemonWithEvolutions(pokemon.id);
                  setShowAutocomplete(false);
                  setSearchTerm("");
                }}
              />
            ))}
          </AutocompleteResults>
        )}
        </SearchContainer>
        <ThemeToggleButton 
          onClick={toggleTheme} 
          isDark={data.isDarkMode}
        >
          {data.isDarkMode ? <LuSunMoon /> : <FaMoon />}
        </ThemeToggleButton>
      </SearchWrapper>
      <Grid>
        {data.pokemonsList?.map((pokemon) => (
          <Card
            key={pokemon.id}
            onClick={() => fetchPokemonWithEvolutions(pokemon.id)}
            style={{ cursor: "pointer" }}
            backgroundColor={getBadgeColorByType(pokemon.types[0].type.name)}
            isDark={data.isDarkMode}
          >
            <PokemonImage
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
            <PokemonName isDark={data.isDarkMode}>{pokemon.name}</PokemonName>

            <TypesContainer>
              {pokemon.types.map((type) => (
                <Badge
                  key={type.type.name}
                  type={type.type.name}
                  color={getBadgeColorByType(type.type.name)}
                  emoji={getEmojiByBadgeName(type.type.name)}
                />
              ))}
            </TypesContainer>
          </Card>
        ))}
      </Grid>

      <div ref={loadMoreRef} style={{ height: "20px", margin: "20px 0" }}>
        {isLoading && <Loading />}
      </div>

      <PokemonModal
        pokemon={
          data.selectedPokemon as
            | (PokemonDetail & { evolution_chain?: any })
            | null
        }
        isOpen={!!data.selectedPokemon}
        onClose={() =>
          setData((prevState) => ({ ...prevState, selectedPokemon: null }))
        }
      />
    </Container>
  );
};

export default PokemonsList;
