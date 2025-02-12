import styled from 'styled-components';
import { isColorDark } from '../../shared/utils';

export interface BadgeProps {
  type: string;
  color: string;
  emoji: string;
}

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