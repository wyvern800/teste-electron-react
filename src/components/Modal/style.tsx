import { styled }  from "styled-components";

interface ModalOverlayProps {
  isOpen: boolean;
  isDark?: boolean;
}

interface ThemeProps {
  isDark?: boolean;
}

export const ModalOverlay = styled.div<ModalOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div<ThemeProps>`
  background: ${props => props.isDark ? '#333' : 'white'};
  color: ${props => props.isDark ? '#fff' : 'inherit'};
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const CloseButton = styled.button<ThemeProps>`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.isDark ? '#999' : '#666'};
  &:hover {
    color: ${props => props.isDark ? '#fff' : '#000'};
  }
`;
