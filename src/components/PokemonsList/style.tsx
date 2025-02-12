import styled from 'styled-components';
import { isColorDark } from '../../shared/utils';

export const Container = styled.div`
  padding: clamp(10px, 2vw, 20px);
  border: 1px solid black;
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

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: clamp(8px, 2vw, 16px);
  text-align: center;
  transition: transform 0.2s ease;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

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

export const PokemonName = styled.h3`
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

interface TypeBadgeProps {
  color: string;
}
export const TypeBadge = styled.span<TypeBadgeProps>`
  background-color: ${(props) => props.color};
  padding: clamp(2px, 1vw, 4px) clamp(4px, 1.5vw, 8px);
  border-radius: 4px;
  font-size: clamp(0.7rem, 2vw, 0.9rem);
  font-weight: bold;

  span {
    color: ${(props) => (isColorDark(props.color) ? '#fff' : '#000')};
  }
`;

export const StatsContainer = styled.div`
  margin-top: clamp(4px, 1.5vw, 8px);
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  color: #666;
`;
