import React from 'react';
import { AutocompleteContainer, PokemonName } from './style';
import { PokemonDetail } from '../../shared/services/pokemon.service';
import { useGlobalContext } from '../../features/contexts/global';

interface AutocompleteItemProps {
  pokemon: PokemonDetail;
  onClick: () => void;
}

const AutocompleteItem: React.FC<AutocompleteItemProps> = ({ pokemon, onClick }) => {
  const { data } = useGlobalContext();
  return (
    <AutocompleteContainer onClick={onClick} isDark={data.isDarkMode}>
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
        width={30} 
        height={30}
      />
      <PokemonName isDark={data.isDarkMode}>{pokemon.name}</PokemonName>
    </AutocompleteContainer>
  );
};

export default AutocompleteItem;
