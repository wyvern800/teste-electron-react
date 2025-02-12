import styled from "@emotion/styled";

interface ThemeProps {
  isDark?: boolean;
}

export const AutocompleteContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.isDark ? '#444' : '#eee'};
  color: ${props => props.isDark ? '#fff' : 'inherit'};
  
  &:hover {
    background-color: ${props => props.isDark ? '#444' : '#f5f5f5'};
  }
`;

export const PokemonName = styled.span<ThemeProps>`
  color: ${props => props.isDark ? '#fff' : 'inherit'};
  margin-left: 8px;
  text-transform: capitalize;
`;
