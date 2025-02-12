import React, { useEffect } from 'react';
import { pokemonService } from '../../shared/services/pokemon.service';
import { useGlobalContext } from '../../features/contexts/global';
import { mainLogger as logger } from '../../shared/services/logger.service';
import {
  Container,
  Grid,
  Card,
  PokemonImage,
  PokemonName,
  TypesContainer,
  TypeBadge,
  StatsContainer
} from './style';

const PokemonsList: React.FC = () => {
  const { data, setData } = useGlobalContext();

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await pokemonService.getPokemonList();
      
      setData((prevState) => ({ 
        ...prevState, 
        pokemonsList: response.results,
        paginationData: {
          currentPage: 1,
          totalPages: Math.ceil(response.count / 20)
        }
      }));
      logger.info('Pokemons list fetched successfully', response);
    };

    fetchPokemons();
  }, []);

  if (!data.pokemonsList) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Grid>
        {data.pokemonsList.map((pokemon) => (
          <Card key={pokemon.id}>
            <PokemonImage 
              src={pokemon.sprites.other["official-artwork"].front_default} 
              alt={pokemon.name}
            />
            <PokemonName>
              {pokemon.name}
            </PokemonName>
            <TypesContainer>
              {pokemon.types.map((type) => (
                <TypeBadge key={type.type.name}>
                  {type.type.name}
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
    </Container>
  );
};

export default PokemonsList;
