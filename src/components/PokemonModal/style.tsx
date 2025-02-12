import styled from "styled-components";

interface ThemeProps {
  isDark?: boolean;
}

export const FavoriteButton = styled.button<ThemeProps>`
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${props => props.isDark ? '#fff' : '#333'};
  padding: 8px;
  border-radius: 50%;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    color: ${props => props.color || (props.isDark ? '#fff' : '#333')};
  }
`;

export const ModalImage = styled.img`
  width: 200px;
  height: 200px;
  display: block;
  margin: 0 auto;
`;

export const EffectivenessSection = styled.div<ThemeProps>`
  margin: 15px 0;
  color: ${props => props.isDark ? '#fff' : 'inherit'};
`;

export const EffectivenessList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

export const EffectivenessItem = styled.div<{effect: 'strong' | 'weak'; isDark?: boolean}>`
  padding: 8px;
  border-radius: 6px;
  background-color: ${props => {
    const alpha = props.isDark ? '66' : '99';
    return props.effect === 'strong' ? `#a8e6cf${alpha}` : `#ffb3b3${alpha}`;
  }};
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.isDark ? '#fff' : '#333'};
`;

export const TypesContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const StatsContainer = styled.div<ThemeProps>`
  margin: 15px 0;
  color: ${props => props.isDark ? '#fff' : 'inherit'};
  ul {
    list-style: none;
    padding: 0;
  }

  li { 
    display: flex; 
    align-items: center;
  }
`;

export const TabsContainer = styled.div<ThemeProps>`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid ${props => props.isDark ? '#555' : '#ddd'};
`;

export const Tab = styled.button<{ active: boolean; isDark?: boolean }>`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => {
    if (props.isDark) {
      return props.active ? "#fff" : "#888";
    }
    return props.active ? "#000" : "#666";
  }};
  border-bottom: ${(props) => (props.active ? `2px solid ${props.isDark ? "#fff" : "#000"}` : "none")};
  margin-bottom: -1px;

  &:hover {
    color: ${props => props.isDark ? '#fff' : '#000'};
  }
`;

export const TabContent = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 10px;
`;

export const StatLabel = styled.span<ThemeProps>`
  width: 100px;
  color: ${props => props.isDark ? '#fff' : 'inherit'};
`;

export const StatValue = styled.span<ThemeProps>`
  width: 40px;
  color: ${props => props.isDark ? '#fff' : 'inherit'};
`;

export const StatBar = styled.div<ThemeProps>`
  flex: 1;
  height: 10px;
  background-color: ${props => props.isDark ? '#444' : '#eee'};
  border-radius: 5px;
  overflow: hidden;
`;

export const StatFill = styled.div<{ value: number; fillColor: string; isDark?: boolean }>`
  width: ${(props) => (props.value / 255) * 100}%;
  height: 100%;
  background-color: ${(props) => props.fillColor};
  opacity: ${props => props.isDark ? 0.8 : 1};
`;

export const EvolutionContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
  color: ${props => props.isDark ? '#fff' : 'inherit'};
`;

export const EvolutionItem = styled.div<ThemeProps>`
  text-align: center;
  color: ${props => props.isDark ? '#fff' : 'inherit'};
  img {
    width: 100px;
    height: 100px;
  }
`;

export const EvolutionArrow = styled.div<ThemeProps>`
  font-size: 24px;
  color: ${props => props.isDark ? '#888' : '#666'};
`;

export const EffectiveSpan = styled.span<ThemeProps>`
  font-weight: bold;
  color: ${props => props.isDark ? '#fff' : 'inherit'};
`;
