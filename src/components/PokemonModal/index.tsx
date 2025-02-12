import React, { useState } from "react";
import { PokemonDetail } from "../../shared/services/pokemon.service";
import { Badge } from "../Badge";
import Modal from "../Modal";
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
} from "../../shared/utils";

const spritesUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

interface PokemonModalProps {
  pokemon: (PokemonDetail & { evolution_chain?: any }) | null;
  isOpen: boolean;
  onClose: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"about" | "stats">("about");

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

      <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>
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

      <TabsContainer>
        <Tab
          active={activeTab === "about"}
          onClick={() => setActiveTab("about")}
        >
          About
        </Tab>
        <Tab
          active={activeTab === "stats"}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </Tab>
      </TabsContainer>

      <TabContent active={activeTab === "about"}>
        <StatsContainer>
          <ul>
            <li>Height: {getMeasure(pokemon.height)}m</li>
            <li>Weight: {getMeasure(pokemon.weight)}kg</li>
          </ul>
        </StatsContainer>

        {pokemon.types.map((pokemonType: any) => (
          <EffectivenessSection key={pokemonType.type.name}>
            <h3>Type: {capitalizeFirst(pokemonType.type.name)}</h3>
            <EffectivenessList>
              {typeEffectiveness[pokemonType.type.name]?.strong.map(
                (type: string) => (
                  <EffectivenessItem
                    key={`strong-${type}`}
                    effect="strong"
                  >
                    Strong against <EffectiveSpan>{capitalizeFirst(type)}</EffectiveSpan>
                  </EffectivenessItem>
                )
              )}
              {typeEffectiveness[pokemonType.type.name]?.weak.map(
                (type: string) => (
                  <EffectivenessItem key={`weak-${type}`} effect="weak">
                    Weak against <EffectiveSpan>{capitalizeFirst(type)}</EffectiveSpan>
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
            <StatLabel>{stat.stat.name}</StatLabel>
            <StatValue>{stat.base_stat}</StatValue>
            <StatBar>
              <StatFill
                value={stat.base_stat}
                fillColor={getBarColor(stat.stat.name)}
              />
            </StatBar>
          </StatRow>
        ))}

        {pokemon.evolution_chain && (
          <EvolutionContainer>
            <EvolutionItem>
              <img
                src={`${spritesUrl}${pokemon.evolution_chain.chain.species.url
                  .split("/")
                  .slice(-2, -1)}.png`}
                alt={pokemon.evolution_chain.chain.species.name}
              />
              <p>
                {pokemon.evolution_chain.chain.species.name}
              </p>
            </EvolutionItem>

            {pokemon.evolution_chain.chain.evolves_to.length > 0 && (
              <>
                <EvolutionArrow>→</EvolutionArrow>
                <EvolutionItem>
                  <img
                    src={`${spritesUrl}${pokemon.evolution_chain.chain.evolves_to[0].species.url
                      .split("/")
                      .slice(-2, -1)}.png`}
                    alt={
                      pokemon.evolution_chain.chain
                        .evolves_to[0].species.name
                    }
                  />
                  <p>
                    {
                      pokemon.evolution_chain.chain
                        .evolves_to[0].species.name
                    }
                  </p>
                </EvolutionItem>

                {pokemon.evolution_chain.chain.evolves_to[0]
                  .evolves_to.length > 0 && (
                  <>
                    <EvolutionArrow>→</EvolutionArrow>
                    <EvolutionItem>
                      <img
                        src={`${spritesUrl}${pokemon.evolution_chain.chain.evolves_to[0].evolves_to[0].species.url
                          .split("/")
                          .slice(-2, -1)}.png`}
                        alt={
                          pokemon.evolution_chain.chain
                            .evolves_to[0].evolves_to[0].species.name
                        }
                      />
                      <p>
                        {
                          pokemon.evolution_chain.chain
                            .evolves_to[0].evolves_to[0].species.name
                        }
                      </p>
                    </EvolutionItem>
                  </>
                )}
              </>
            )}
          </EvolutionContainer>
        )}
      </TabContent>
    </Modal>
  );
};

export default PokemonModal;
