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