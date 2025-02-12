import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonModal from '../index';
import { PokemonDetail } from '../../../shared/services/pokemon.service';
import * as GlobalContext from '../../../features/contexts/global';

// Mock the GlobalContext
jest.mock('../../../features/contexts/global', () => ({
  useGlobalContext: jest.fn(() => ({
    data: { isDarkMode: false }
  }))
}));

// Mock the styled-components and icons
jest.mock('../style', () => {
  const StyledWrapper = ({ children, className = '', ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  );

  return {
    ModalImage: 'img',
    EffectivenessSection: StyledWrapper,
    EffectivenessList: StyledWrapper,
    EffectivenessItem: StyledWrapper,
    TypesContainer: StyledWrapper,
    StatsContainer: StyledWrapper,
    TabsContainer: StyledWrapper,
    Tab: ({ children, active, ...props }: any) => (
      <button data-active={active} {...props}>{children}</button>
    ),
    TabContent: ({ active, children }: any) => active ? <div>{children}</div> : null,
    StatRow: StyledWrapper,
    StatLabel: StyledWrapper,
    StatValue: StyledWrapper,
    StatBar: StyledWrapper,
    StatFill: StyledWrapper,
    EvolutionContainer: StyledWrapper,
    EvolutionItem: StyledWrapper,
    EvolutionArrow: StyledWrapper,
    EffectiveSpan: StyledWrapper,
  };
});

jest.mock('react-icons/lu', () => ({
  LuWeight: () => 'WeightIcon'
}));

jest.mock('react-icons/rx', () => ({
  RxHeight: () => 'HeightIcon'
}));

// Mock the Modal component
jest.mock('../../Modal', () => {
  return function MockModal({ children, isOpen }: any) {
    return isOpen ? <div data-testid="modal">{children}</div> : null;
  };
});

const mockPokemon: PokemonDetail & { evolution_chain?: any } = {
  id: 25,
  name: 'pikachu',
  height: 40,
  weight: 60,
  sprites: {
    front_default: 'pikachu-front.png',
    other: {
      'official-artwork': {
        front_default: 'pikachu.png'
      }
    }
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/'
      }
    }
  ],
  stats: [
    {
      base_stat: 55,
      stat: {
        name: 'hp'
      }
    },
    {
      base_stat: 90,
      stat: {
        name: 'speed'
      }
    }
  ],
  evolution_chain: {
    chain: {
      species: {
        name: 'pichu',
        url: 'https://pokeapi.co/api/v2/pokemon-species/172/'
      },
      evolves_to: [
        {
          species: {
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon-species/25/'
          },
          evolves_to: [
            {
              species: {
                name: 'raichu',
                url: 'https://pokeapi.co/api/v2/pokemon-species/26/'
              },
              evolves_to: []
            }
          ]
        }
      ]
    }
  }
};

describe('PokemonModal Component', () => {
  const mockOnClose = jest.fn();
  const mockUseGlobalContext = GlobalContext.useGlobalContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pokemon details correctly', () => {
    render(
      <PokemonModal 
        pokemon={mockPokemon} 
        isOpen={true} 
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText(/Height: 4m/)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 6kg/)).toBeInTheDocument();
  });

  it('switches between tabs', () => {
    render(
      <PokemonModal 
        pokemon={mockPokemon} 
        isOpen={true} 
        onClose={mockOnClose}
      />
    );

    // Initially shows About tab
    expect(screen.getByText(/Height:/)).toBeInTheDocument();

    // Switch to Stats tab
    fireEvent.click(screen.getByText('Stats'));
    // Look for stat names including emojis
    expect(screen.getByText((content) => content.endsWith('Hp'))).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();
    expect(screen.getByText((content) => content.endsWith('Speed'))).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
  });

  it('renders null when pokemon is null', () => {
    render(
      <PokemonModal 
        pokemon={null} 
        isOpen={true} 
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('shows evolution chain in stats tab', () => {
    render(
      <PokemonModal 
        pokemon={mockPokemon} 
        isOpen={true} 
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByText('Stats'));
    expect(screen.getByText('Pichu')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Raichu')).toBeInTheDocument();
  });

  it('handles dark mode correctly', () => {
    mockUseGlobalContext.mockImplementation(() => ({
      data: { isDarkMode: true }
    }));

    render(
      <PokemonModal 
        pokemon={mockPokemon} 
        isOpen={true} 
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('pikachu')).toHaveStyle({ color: '#fff' });
  });
});
