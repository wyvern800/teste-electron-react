import React from "react";
import { ModalOverlay, ModalContent, CloseButton } from "./style";
import { useGlobalContext } from "../../features/contexts/global";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { data } = useGlobalContext();

  return (
    <ModalOverlay isOpen={isOpen} isDark={data.isDarkMode}>
      <ModalContent isDark={data.isDarkMode}>
        <CloseButton onClick={onClose} isDark={data.isDarkMode}>&times;</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
