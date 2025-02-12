import styled from "styled-components";

export const ModalImage = styled.img`
  width: 200px;
  height: 200px;
  display: block;
  margin: 0 auto;
`;

export const EffectivenessSection = styled.div`
  margin: 15px 0;
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

export const TypesContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const StatsContainer = styled.div`
  margin: 15px 0;
  ul {
    list-style: none;
    padding: 0;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => (props.active ? "#000" : "#666")};
  border-bottom: ${(props) => (props.active ? "2px solid #000" : "none")};
  margin-bottom: -1px;

  &:hover {
    color: #000;
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

export const StatLabel = styled.span`
  width: 100px;
`;

export const StatValue = styled.span`
  width: 40px;
`;

export const StatBar = styled.div`
  flex: 1;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
`;

export const StatFill = styled.div<{ value: number; fillColor: string }>`
  width: ${(props) => (props.value / 255) * 100}%;
  height: 100%;
  background-color: ${(props) => props.fillColor};
`;

export const EvolutionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const EvolutionItem = styled.div`
  text-align: center;
  img {
    width: 100px;
    height: 100px;
  }
`;

export const EvolutionArrow = styled.div`
  font-size: 24px;
  color: #666;
`;

export const EffectiveSpan = styled.span`
  font-weight: bold;
`;
