import React from 'react';
import { AutocompleteContainer, PokemonName } from './style';
import { PokemonDetail } from '../../shared/services/pokemon.service';

interface AutocompleteItemProps {
  pokemon: PokemonDetail;
  onClick: () => void;
}

const AutocompleteItem: React.FC<AutocompleteItemProps> = ({ pokemon, onClick }) => {
  return (
    <AutocompleteContainer onClick={onClick}>
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
        width={30} 
        height={30}
      />
      <PokemonName>{pokemon.name}</PokemonName>
    </AutocompleteContainer>
  );
};

export default AutocompleteItem;
