import React, { useState } from "react";
import { PokemonDetail } from "../../shared/services/pokemon.service";
import { Badge } from "../Badge";
import Modal from "../Modal";
import { useGlobalContext } from "../../features/contexts/global";
import {
  ModalImage,
  EffectivenessSection,
  EffectivenessList,
  EffectivenessItem,
  TypesContainer,
  StatsContainer,
  TabsContainer,
  Tab,
  TabContent,
  StatRow,
  StatLabel,
  StatValue,
  StatBar,
  StatFill,
  EvolutionContainer,
  EvolutionItem,
  EvolutionArrow,
  EffectiveSpan,
} from "./style";
import {
  getBadgeColorByType,
  getEmojiByBadgeName,
  typeEffectiveness,
  getBarColor,
  capitalizeFirst,
  getStatIcon
} from "../../shared/utils";
import { LuWeight } from "react-icons/lu";
import { RxHeight } from "react-icons/rx";

const spritesUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

interface PokemonModalProps {
  pokemon: (PokemonDetail & { evolution_chain?: any }) | null;
  isOpen: boolean;
  onClose: () => void;
}

interface EvolutionChainProps {
  chain: any;
  isDark: boolean;
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ chain, isDark }) => {
  const getPokemonId = (url: string) => url.split("/").slice(-2, -1)[0];

  return (
    <>
      <EvolutionItem isDark={isDark}>
        <img
          src={`${spritesUrl}${getPokemonId(chain.species.url)}.png`}
          alt={chain.species.name}
        />
        <p>{capitalizeFirst(chain.species.name)}</p>
      </EvolutionItem>

      {chain.evolves_to.length > 0 && (
        <>
          <EvolutionArrow isDark={isDark}>→</EvolutionArrow>
          <EvolutionChain chain={chain.evolves_to[0]} isDark={isDark} />
        </>
      )}
    </>
  );
};

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"about" | "stats">("about");
  const { data } = useGlobalContext();

  const getMeasure = (value: number) => {
    return value / 10;
  };

  if (!pokemon) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalImage
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />

      <h2 style={{ 
        fontSize: "1.5rem", 
        textAlign: "center", 
        textTransform: "capitalize",
        color: data.isDarkMode ? '#fff' : 'inherit'
      }}>
        {pokemon.name}
      </h2>

      <TypesContainer style={{ marginBottom: "15px", display: "flex", justifyContent: "center" }}>
        {pokemon.types.map((type: any) => (
          <Badge
            key={type.type.name}
            type={type.type.name}
            color={getBadgeColorByType(type.type.name)}
            emoji={getEmojiByBadgeName(type.type.name)}
          />
        ))}
      </TypesContainer>

      <TabsContainer isDark={data.isDarkMode}>
        <Tab
          active={activeTab === "about"}
          onClick={() => setActiveTab("about")}
          isDark={data.isDarkMode}
        >
          About
        </Tab>
        <Tab
          active={activeTab === "stats"}
          onClick={() => setActiveTab("stats")}
          isDark={data.isDarkMode}
        >
          Stats
        </Tab>
      </TabsContainer>

      <TabContent active={activeTab === "about"}>
        <StatsContainer isDark={data.isDarkMode}>
          <ul>
            <li><RxHeight style={{ marginRight: '3px' }} /> Height: {getMeasure(pokemon.height)}m</li>
            <li><LuWeight style={{ marginRight: '3px' }} /> Weight: {getMeasure(pokemon.weight)}kg</li>
          </ul>
        </StatsContainer>

        {pokemon.types.map((pokemonType: any) => (
          <EffectivenessSection key={pokemonType.type.name} isDark={data.isDarkMode}>
            <h3>Type: {capitalizeFirst(pokemonType.type.name)}</h3>
            <EffectivenessList>
              {typeEffectiveness[pokemonType.type.name]?.strong.map(
                (type: string) => (
                  <EffectivenessItem
                    key={`strong-${type}`}
                    effect="strong"
                    isDark={data.isDarkMode}
                  >
                    Strong against <EffectiveSpan isDark={data.isDarkMode}>{capitalizeFirst(type)}</EffectiveSpan>
                  </EffectivenessItem>
                )
              )}
              {typeEffectiveness[pokemonType.type.name]?.weak.map(
                (type: string) => (
                  <EffectivenessItem 
                    key={`weak-${type}`} 
                    effect="weak"
                    isDark={data.isDarkMode}
                  >
                    Weak against <EffectiveSpan isDark={data.isDarkMode}>{capitalizeFirst(type)}</EffectiveSpan>
                  </EffectivenessItem>
                )
              )}
            </EffectivenessList>
          </EffectivenessSection>
        ))}
      </TabContent>

      <TabContent active={activeTab === "stats"}>
        {pokemon.stats?.map((stat: any) => (
          <StatRow key={stat.stat.name}>
            <StatLabel isDark={data.isDarkMode}>{getStatIcon(stat.stat.name)} {capitalizeFirst(stat.stat.name)}</StatLabel>
            <StatValue isDark={data.isDarkMode}>{stat.base_stat}</StatValue>
            <StatBar isDark={data.isDarkMode}>
              <StatFill
                value={stat.base_stat}
                fillColor={getBarColor(stat.stat.name)}
                isDark={data.isDarkMode}
              />
            </StatBar>
          </StatRow>
        ))}

        {pokemon.evolution_chain && (
          <EvolutionContainer isDark={data.isDarkMode}>
            <EvolutionChain chain={pokemon.evolution_chain.chain} isDark={data.isDarkMode} />
          </EvolutionContainer>
        )}
      </TabContent>
    </Modal>
  );
};

export default PokemonModal;
