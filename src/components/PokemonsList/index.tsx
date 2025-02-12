import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  pokemonService,
  PokemonDetail,
} from "../../shared/services/pokemon.service";
import { useGlobalContext } from "../../features/contexts/global";
import { mainLogger as logger } from "../../shared/services/logger.service";
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
  StatsContainer,
  TabsContainer,
  Tab,
  TabContent,
  StatRow,
  StatLabel,
  StatValue,
  StatBar,
  StatFill,
  EvolutionContainer,
  EvolutionItem,
  EvolutionArrow,
  EffectiveSpan
} from "./style";
import Loading from "../Loading";
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

  type PokemonWithEvolution = PokemonDetail & { evolution_chain?: any };
  const selectedPokemon = data.selectedPokemon as PokemonWithEvolution;

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "stats">("about");
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

  const closeModal = async () => {
    setData((prevState) => ({
      ...prevState,
      selectedPokemon: null,
    }));
    setIsModalOpen(false);
    setActiveTab("about");
  };

  const getMeasure = (value: number) => {
    return value / 10;
  };

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
              fetchPokemonWithEvolutions(pokemon.id);
              setIsModalOpen(true);
            }}
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
                <TypeBadge
                  key={type.type.name}
                  color={getBadgeColorByType(type.type.name)}
                >
                  <span>
                    {getEmojiByBadgeName(type.type.name)} {capitalizeFirst(type.type.name)}
                  </span>
                </TypeBadge>
              ))}
            </TypesContainer>

            <StatsContainer>
              <p>Height: {getMeasure(pokemon.height)}m</p>
              <p>Weight: {getMeasure(pokemon.weight)}kg</p>
            </StatsContainer>
          </Card>
        ))}
      </Grid>

      <div ref={loadMoreRef} style={{ height: "20px", margin: "20px 0" }}>
        {isLoading && <Loading />}
      </div>

      <ModalOverlay isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={() => closeModal()}>&times;</CloseButton>

          {selectedPokemon && (
            <>
              <ModalImage
                src={
                  selectedPokemon.sprites.other["official-artwork"]
                    .front_default
                }
                alt={selectedPokemon.name}
              />

              <PokemonName style={{ fontSize: "1.5rem" }}>
                {selectedPokemon.name}
              </PokemonName>

              <TypesContainer style={{ marginBottom: "15px", display: "flex", justifyContent: "flex-start" }}>
                {selectedPokemon.types.map((type: any) => (
                  <TypeBadge
                    key={type.type.name}
                    color={getBadgeColorByType(type.type.name)}
                  >
                    <span>
                      {getEmojiByBadgeName(type.type.name)} {capitalizeFirst(type.type.name)}
                    </span>
                  </TypeBadge>
                ))}
              </TypesContainer>

              <TabsContainer>
                <Tab
                  active={activeTab === "about"}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </Tab>
                <Tab
                  active={activeTab === "stats"}
                  onClick={() => setActiveTab("stats")}
                >
                  Stats
                </Tab>
              </TabsContainer>

              <TabContent active={activeTab === "about"}>
                <StatsContainer>
                  <ul>
                    <li>Height: {getMeasure(selectedPokemon.height)}m</li>
                    <li>Weight: {getMeasure(selectedPokemon.weight)}kg</li>
                  </ul>
                </StatsContainer>

                {selectedPokemon.types.map((pokemonType: any) => (
                  <EffectivenessSection key={pokemonType.type.name}>
                    <h3>Type: {capitalizeFirst(pokemonType.type.name)}</h3>
                    <EffectivenessList>
                      {typeEffectiveness[pokemonType.type.name]?.strong.map(
                        (type: string) => (
                          <EffectivenessItem
                            key={`strong-${type}`}
                            effect="strong"
                          >
                            Strong against <EffectiveSpan>{capitalizeFirst(type)}</EffectiveSpan>
                          </EffectivenessItem>
                        )
                      )}
                      {typeEffectiveness[pokemonType.type.name]?.weak.map(
                        (type: string) => (
                          <EffectivenessItem key={`weak-${type}`} effect="weak">
                            Weak against <EffectiveSpan>{capitalizeFirst(type)}</EffectiveSpan>
                          </EffectivenessItem>
                        )
                      )}
                    </EffectivenessList>
                  </EffectivenessSection>
                ))}
              </TabContent>

              <TabContent active={activeTab === "stats"}>
                {selectedPokemon.stats?.map((stat: any) => (
                  <StatRow key={stat.stat.name}>
                    <StatLabel>{stat.stat.name}</StatLabel>
                    <StatValue>{stat.base_stat}</StatValue>
                    <StatBar>
                      <StatFill
                        value={stat.base_stat}
                        fillColor={getBarColor(stat.stat.name)}
                      />
                    </StatBar>
                  </StatRow>
                ))}

                {selectedPokemon.evolution_chain && (
                  <EvolutionContainer>
                    {/* First evolution */}
                    <EvolutionItem>
                      <img
                        src={`${spritesUrl}${selectedPokemon.evolution_chain.chain.species.url
                          .split("/")
                          .slice(-2, -1)}.png`}
                        alt={selectedPokemon.evolution_chain.chain.species.name}
                      />
                      <p>
                        {selectedPokemon.evolution_chain.chain.species.name}
                      </p>
                    </EvolutionItem>

                    {selectedPokemon.evolution_chain.chain.evolves_to.length >
                      0 && (
                      <>
                        <EvolutionArrow>→</EvolutionArrow>
                        {/* Second evolution */}
                        <EvolutionItem>
                          <img
                            src={`${spritesUrl}${selectedPokemon.evolution_chain.chain.evolves_to[0].species.url
                              .split("/")
                              .slice(-2, -1)}.png`}
                            alt={
                              selectedPokemon.evolution_chain.chain
                                .evolves_to[0].species.name
                            }
                          />
                          <p>
                            {
                              selectedPokemon.evolution_chain.chain
                                .evolves_to[0].species.name
                            }
                          </p>
                        </EvolutionItem>

                        {selectedPokemon.evolution_chain.chain.evolves_to[0]
                          .evolves_to.length > 0 && (
                          <>
                            <EvolutionArrow>→</EvolutionArrow>
                            {/* Third evolution */}
                            <EvolutionItem>
                              <img
                                src={`${spritesUrl}${selectedPokemon.evolution_chain.chain.evolves_to[0].evolves_to[0].species.url
                                  .split("/")
                                  .slice(-2, -1)}.png`}
                                alt={
                                  selectedPokemon.evolution_chain.chain
                                    .evolves_to[0].evolves_to[0].species.name
                                }
                              />
                              <p>
                                {
                                  selectedPokemon.evolution_chain.chain
                                    .evolves_to[0].evolves_to[0].species.name
                                }
                              </p>
                            </EvolutionItem>
                          </>
                        )}
                      </>
                    )}
                  </EvolutionContainer>
                )}
              </TabContent>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default PokemonsList;
