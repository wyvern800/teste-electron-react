import styled from 'styled-components';
import { isColorDark } from '../../shared/utils';

interface ModalProps {
  isOpen: boolean;
}

export const ModalOverlay = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 90%;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

export const ModalImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
`;

export const EffectivenessSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 15px;
`;

export const EffectivenessList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

export const EffectivenessItem = styled.div<{effect: 'strong' | 'weak'}>`
  padding: 8px;
  border-radius: 6px;
  background-color: ${props => props.effect === 'strong' ? '#a8e6cf' : '#ffb3b3'};
  text-align: center;
  font-size: 0.9rem;
`;

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

interface CardProps {
  backgroundColor?: string;
}

export const Card = styled.div<CardProps>`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: clamp(8px, 2vw, 16px);
  text-align: center;
  transition: transform 0.2s ease;
  background: ${props => props.backgroundColor ? `${props.backgroundColor}33` : 'white'};
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

  span {
    color: ${(props) => (isColorDark(props.color) ? '#fff' : '#000')};
  }
`;

export const StatsContainer = styled.div`
  margin-top: clamp(4px, 1.5vw, 8px);
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  color: #666;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: ${props => props.active ? '#4a90e2' : '#e0e0e0'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#357abd' : '#d0d0d0'};
  }
`;

export const TabContent = styled.div<{ active: boolean }>`
  display: ${props => props.active ? 'block' : 'none'};
`;

export const StatBar = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin-top: 4px;
  overflow: hidden;
`;

export const StatFill = styled.div<{ value: number, fillColor: string }>`
  width: ${props => Math.min((props.value / 255) * 100, 100)}%;
  height: 100%;
  background: ${props => props.fillColor ?? `#4a90e2`};
  border-radius: 4px;
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
`;

export const StatLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  width: 100px;
`;

export const StatValue = styled.span`
  font-size: 0.9rem;
  color: #333;
  width: 40px;
`;

export const EvolutionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const EvolutionItem = styled.div`
  text-align: center;
  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
  p {
    margin: 5px 0;
    font-size: 0.9rem;
    color: #666;
    text-transform: capitalize;
  }
`;

export const EvolutionArrow = styled.div`
  font-size: 1.5rem;
  color: #666;
`;

export const EffectiveSpan = styled.span`
  font-weight: bold;
`;