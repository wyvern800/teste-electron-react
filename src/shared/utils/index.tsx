import { ColorsType } from "../../core/types/colors.type";

export const getBadgeColorByType = (type: string): string => {
    const colors: ColorsType = {
      normal: '#a8a878',
      fire: '#f08030',
      water: '#6890f0',
      electric: '#f8d030',
      grass: '#78c850',
      ice: '#98d8d8',
      fighting: '#c03028',
      poison: '#a040a0',
      ground: '#e0c068',
      flying: '#a890f0',
      psychic: '#f85888',
      bug: '#a8b820',
      rock: '#b8a038',
      ghost: '#705898',
      dragon: '#7038f8',
      dark: '#705848',
      steel: '#b8b8d0',
      fairy: '#ee99ac'
    }

    return colors[type] || '#f0f0f0';
  }

  export const getEmojiByBadgeName = (badgeName: string): string => {
    const emojis: { [key: string]: string } = {
      normal: '🔰',
      fire: '🔥',
      water: '💧',
      electric: '⚡',
      grass: '🌿',
      ice: '❄️',
      fighting: '🥊',
      poison: '☠️',
      ground: '🌍',
      flying: '🕊️',
      psychic: '🔮',
      bug: '🐛',
      rock: '🗿',
      ghost: '👻',
      dragon: '🐉',
      dark: '🌑',
      steel: '🔩',
      fairy: '🧚'
    };

    return emojis[badgeName] || '❓';
  };
  
  export const getBarColor = (statName: number): string => {
    const colors: { [key: string]: string } = {
      'hp': '#ff5959',
      'attack': '#f5ac78',
      'defense': '#fae078',
      'special-attack': '#9db7f5',
      'special-defense': '#a7db8d',
      'speed': '#fa92b2'
    }
    return colors[statName] || '#f0f0f0';
  }

  export const getStatIcon = (statName: number): string => {
    const colors: { [key: string]: string } = {
      'hp': '❤️',
      'attack': '⚔️',
      'defense': '🛡️',
      'special-attack': '🔥',
      'special-defense': '📿',
      'speed': '⚡'
    }
    return colors[statName] || '#f0f0f0';
  }

  export const isColorDark = (hexColor: string): boolean => {
    // Remove the hash if present
    const color = hexColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    
    // Calculate brightness using YIQ formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  // Type effectiveness data (simulated)
export const typeEffectiveness: Record<string, { strong: string[], weak: string[] }> = {
  fire: {
    strong: ['grass', 'ice', 'bug', 'steel'],
    weak: ['water', 'rock', 'ground']
  },
  water: {
    strong: ['fire', 'ground', 'rock'],
    weak: ['electric', 'grass']
  },
  grass: {
    strong: ['water', 'ground', 'rock'],
    weak: ['fire', 'ice', 'poison', 'flying', 'bug']
  },
  electric: {
    strong: ['water', 'flying'],
    weak: ['ground']
  },
  ice: {
    strong: ['grass', 'ground', 'flying', 'dragon'],
    weak: ['fire', 'fighting', 'rock', 'steel']
  },
  fighting: {
    strong: ['normal', 'ice', 'rock', 'dark', 'steel'],
    weak: ['flying', 'psychic', 'fairy']
  },
  poison: {
    strong: ['grass', 'fairy'],
    weak: ['ground', 'psychic']
  },
  ground: {
    strong: ['fire', 'electric', 'poison', 'rock', 'steel'],
    weak: ['water', 'grass', 'ice']
  },
  flying: {
    strong: ['grass', 'fighting', 'bug'],
    weak: ['electric', 'ice', 'rock']
  },
  psychic: {
    strong: ['fighting', 'poison'],
    weak: ['dark', 'ghost', 'bug']
  },
  bug: {
    strong: ['grass', 'psychic', 'dark'],
    weak: ['fire', 'flying', 'rock']
  },
  rock: {
    strong: ['fire', 'ice', 'flying', 'bug'],
    weak: ['water', 'grass', 'fighting', 'ground', 'steel']
  },
  ghost: {
    strong: ['psychic', 'ghost'],
    weak: ['dark', 'ghost']
  },
  dragon: {
    strong: ['dragon'],
    weak: ['ice', 'dragon', 'fairy']
  },
  dark: {
    strong: ['psychic', 'ghost'],
    weak: ['fighting', 'bug', 'fairy']
  },
  steel: {
    strong: ['ice', 'rock', 'fairy'],
    weak: ['fire', 'fighting', 'ground']
  },
  fairy: {
    strong: ['fighting', 'dragon', 'dark'],
    weak: ['poison', 'steel']
  },
  normal: {
    strong: [],
    weak: ['fighting']
  }
};

export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}