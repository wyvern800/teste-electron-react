import styled from "@emotion/styled";

export const AutocompleteContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const PokemonName = styled.span`
  margin-left: 8px;
  text-transform: capitalize;
`;
