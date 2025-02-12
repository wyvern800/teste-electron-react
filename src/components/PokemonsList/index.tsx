import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  pokemonService,
  PokemonDetail,
} from "../../shared/services/pokemon.service";
import { useGlobalContext } from "../../features/contexts/global";
import { mainLogger as logger } from "../../shared/services/logger.service";
import { Container, Grid, Card, PokemonImage, PokemonName, TypesContainer } from "./style";
import { Badge } from "../Badge";
import Loading from "../Loading";
import PokemonModal from "../PokemonModal";
import {
  getBadgeColorByType,
  getEmojiByBadgeName,
  typeEffectiveness,
  getBarColor,
  capitalizeFirst,
} from "../../shared/utils";

const spritesUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

const PokemonsList: React.FC = () => {
  const { data, setData } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <Container>
      <Grid>
        {data.pokemonsList?.map((pokemon) => (
          <Card
            key={pokemon.id}
            onClick={() => fetchPokemonWithEvolutions(pokemon.id)}
            style={{ cursor: "pointer" }}
            backgroundColor={getBadgeColorByType(pokemon.types[0].type.name)}
          >
            <PokemonImage
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
            <PokemonName>{pokemon.name}</PokemonName>

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
        pokemon={data.selectedPokemon as (PokemonDetail & { evolution_chain?: any }) | null}
        isOpen={!!data.selectedPokemon}
        onClose={() => setData((prevState) => ({ ...prevState, selectedPokemon: null }))}
      />
    </Container>
  );
};

export default PokemonsList;
