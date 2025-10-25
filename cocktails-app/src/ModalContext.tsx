import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

type ModalContextType = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<ReactNode[]>([]);

  useEffect(() => {
    document.body.style.overflow = modals.length > 0 ? 'hidden' : 'auto';
    document.documentElement.style.setProperty('--page_margin_right', modals.length > 0 ? '15px' : '0px');

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modals.length]);

  const openModal = (content: ReactNode) => {
    setModals(currentModals => [...currentModals, content]);
  };

  const closeModal = () => {
    setModals(currentModals => currentModals.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modalContent, index) => (
        <div
          className="modal-overlay"
          key={index}
          onClick={index === modals.length - 1 ? closeModal : undefined}
        >
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            {modalContent}
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
