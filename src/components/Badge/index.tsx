import React from 'react';
import { TypeBadge, BadgeProps } from './styles';

export const Badge: React.FC<BadgeProps> = ({ type, color, emoji }) => {
  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <TypeBadge color={color}>
      <span>
        {emoji} {capitalizeFirst(type)}
      </span>
    </TypeBadge>
  );
};
