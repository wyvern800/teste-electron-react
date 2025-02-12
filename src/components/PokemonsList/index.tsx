import React, { useEffect, useRef, useCallback, useState } from 'react';
import { pokemonService } from '../../shared/services/pokemon.service';
import { useGlobalContext } from '../../features/contexts/global';
import { mainLogger as logger } from '../../shared/services/logger.service';
import {
  Container,
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalImage,
  EffectivenessSection,
  EffectivenessList,
  EffectivenessItem,
  Grid,
  Card,
  PokemonImage,
  PokemonName,
  TypesContainer,
  TypeBadge,
  StatsContainer
} from './style';
import Loading from "../Loading";
import { getBadgeColorByType, getEmojiByBadgeName, typeEffectiveness } from "../../shared/utils";

const PokemonsList: React.FC = () => {
  const { data, setData } = useGlobalContext();
  const { selectedPokemon } = data;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadMoreRef = useRef(null);

  /**
   * Fetches a page of Pokemon data from the API
   * Updates the global state with new Pokemon data and pagination information
   * @param page - The page number to fetch
   */
  const fetchPokemons = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const response = await pokemonService.getPokemonList(page);
      
      setData((prevState) => ({ 
        ...prevState, 
        pokemonsList: page === 1 
          ? response.results 
          : [...(prevState.pokemonsList || []), ...response.results],
        paginationData: {
          currentPage: page,
          totalPages: Math.ceil(response.count / 20)
        }
      }));
      logger.info('Pokemons list fetched successfully', response);
    } catch (error: unknown) {
      logger.error('Error fetching pokemons', error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [setData]);

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
        if (entry.isIntersecting && !isLoading && data.paginationData?.currentPage < data.paginationData?.totalPages) {
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
            onClick={() => {
              setData((prevState) => ({ 
                ...prevState, 
                selectedPokemon: pokemon
              }));
              setIsModalOpen(true);
            }}
            style={{ cursor: 'pointer' }}
            backgroundColor={getBadgeColorByType(pokemon.types[0].type.name)}
          >

            <PokemonImage 
              src={pokemon.sprites.other["official-artwork"].front_default} 
              alt={pokemon.name}
            />
            <PokemonName>
              {pokemon.name}
            </PokemonName>

            <TypesContainer>
              {pokemon.types.map((type) => (
                <TypeBadge key={type.type.name} color={getBadgeColorByType(type.type.name)}>
                  <span>{getEmojiByBadgeName(type.type.name)} {type.type.name}</span>
                </TypeBadge>
              ))}
            </TypesContainer>

            <StatsContainer>
              <p>Height: {pokemon.height / 10}m</p>
              <p>Weight: {pokemon.weight / 10}kg</p>
            </StatsContainer>
          </Card>
        ))}
      </Grid>

      <div ref={loadMoreRef} style={{ height: '20px', margin: '20px 0' }}>
        {isLoading && <Loading />}
      </div>

      <ModalOverlay isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
          
          {selectedPokemon && (
            <>
              <ModalImage
                src={selectedPokemon.sprites.other["official-artwork"].front_default}
                alt={selectedPokemon.name}
              />
              
              <PokemonName style={{ fontSize: '1.5rem' }}>
                {selectedPokemon.name}
              </PokemonName>

              <TypesContainer style={{ marginBottom: '15px' }}>
                {selectedPokemon.types.map((type: any) => (
                  <TypeBadge key={type.type.name} color={getBadgeColorByType(type.type.name)}>
                    <span>{getEmojiByBadgeName(type.type.name)} {type.type.name}</span>
                  </TypeBadge>
                ))}
              </TypesContainer>

              <StatsContainer>
                <p>Height: {selectedPokemon.height / 10}m</p>
                <p>Weight: {selectedPokemon.weight / 10}kg</p>
              </StatsContainer>

              {selectedPokemon.types.map((pokemonType: any) => (
                <EffectivenessSection key={pokemonType.type.name}>
                  <h3>Type: {pokemonType.type.name}</h3>
                  <EffectivenessList>
                    {typeEffectiveness[pokemonType.type.name]?.strong.map((type: string) => (
                      <EffectivenessItem key={`strong-${type}`} effect="strong">
                        Strong against {type}
                      </EffectivenessItem>
                    ))}
                    {typeEffectiveness[pokemonType.type.name]?.weak.map((type: string) => (
                      <EffectivenessItem key={`weak-${type}`} effect="weak">
                        Weak against {type}
                      </EffectivenessItem>
                    ))}
                  </EffectivenessList>
                </EffectivenessSection>
              ))}
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default PokemonsList;
