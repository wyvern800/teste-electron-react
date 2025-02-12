import styled from 'styled-components';
import { isColorDark } from '../../shared/utils';

export const Container = styled.div`
  padding: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

export const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
`;

export const PokemonName = styled.h3`
  text-transform: capitalize;
  margin: 8px 0;
`;

export const TypesContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

interface TypeBadgeProps {
  color: string;
}
export const TypeBadge = styled.span<TypeBadgeProps>`
  background-color: ${(props) => props.color};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;

  span {
    color: ${(props) => (isColorDark(props.color) ? '#fff' : '#000')};
  }
`;

export const StatsContainer = styled.div`
  margin-top: 8px;
  font-size: 0.9em;
  color: #666;
`;
