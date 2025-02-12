import styled from 'styled-components';

interface ThemeProps {
  isDark?: boolean;
}

interface SearchWrapperProps {
  isDark?: boolean;
}

export const SearchWrapper = styled.div<SearchWrapperProps>`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

export const ThemeToggleButton = styled.button<ThemeProps>`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.isDark ? '#333' : '#fff'};
  color: ${props => props.isDark ? '#fff' : '#333'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.isDark ? '#444' : '#f0f0f0'};
  }
`;

export const SearchContainer = styled.div<ThemeProps>`
  position: relative;
  width: 100%;
`;

export const SearchInput = styled.input<ThemeProps>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${props => props.isDark ? '#555' : '#ccc'};
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  background: ${props => props.isDark ? '#333' : '#fff'};
  color: ${props => props.isDark ? '#fff' : '#333'};
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }

  &::placeholder {
    color: ${props => props.isDark ? '#888' : '#666'};
  }
`;

export const AutocompleteResults = styled.div<ThemeProps>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.isDark ? '#333' : 'white'};
  border: 1px solid ${props => props.isDark ? '#555' : '#ccc'};
  border-radius: 4px;
  margin-top: 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Container = styled.div<ThemeProps>`
  padding: clamp(10px, 2vw, 20px);
  border: 1px solid ${props => props.isDark ? '#555' : 'black'};
  background: ${props => props.isDark ? '#222' : '#fff'};
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: clamp(10px, 2vw, 20px);
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
`;

interface CardProps {
  backgroundColor?: string;
  isDark?: boolean;
  isFavorite?: boolean;
}

export const Card = styled.div<CardProps>`
  border: ${props => 
    props.isFavorite 
      ? `2px solid ${props.backgroundColor}${props.isDark ? 'FF' : '99'}`
      : '1px solid #ccc'};
  border-radius: 8px;
  padding: clamp(8px, 2vw, 16px);
  text-align: center;
  transition: transform 0.2s ease;
  background: ${props => props.backgroundColor ? `${props.backgroundColor}${props.isDark ? '66' : '33'}` : props.isDark ? '#333' : 'white'};
  box-shadow: ${props => 
    props.isFavorite 
      ? `0 2px 8px ${props.backgroundColor}${props.isDark ? '99' : '66'}`
      : `0 2px 4px ${props.isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`;

export const PokemonImage = styled.img`
  width: clamp(80px, 15vw, 120px);
  height: clamp(80px, 15vw, 120px);
  object-fit: contain;
  margin: 0 auto;
  display: block;
`;

export const PokemonName = styled.h3<ThemeProps>`
  color: ${props => props.isDark ? '#fff' : '#333'};
  text-transform: capitalize;
  margin: 8px 0;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TypesContainer = styled.div`
  display: flex;
  gap: clamp(4px, 1vw, 8px);
  justify-content: center;
  flex-wrap: wrap;
  padding: 4px 0;
`;
