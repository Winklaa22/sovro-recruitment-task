import { createContext, useState, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode, MouseEvent } from 'react';

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
  const [closingIndex, setClosingIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = modals.length > 0 ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modals.length]);

  const openModal = (content: ReactNode) => {
    setModals(currentModals => [...currentModals, content]);
  };

  const closeModal = () => {
    const DELAY_MS = 300;
    setClosingIndex(modals.length - 1);

    setTimeout(() => {
      setModals((currentModals) => currentModals.slice(0, -1));
      setClosingIndex(null);
    }, DELAY_MS);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <AnimatePresence>
        {modals.map((modalContent, index) => {
          const isTop = index === modals.length - 1;
          const isClosing = closingIndex === index;

          const overlayVariants = {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 },
          };

          const wrapperVariants = {
            hidden: { y: -50, opacity: 0 },
            visible: { y: 0, opacity: 1 },
            exit: { y: -30, opacity: 0 },
          };

          return (
            <motion.div
              // @ts-ignore allow motion props
              className="modal-overlay"
              key={index}
              onClick={isTop ? closeModal : undefined}
              initial="hidden"
              animate={isClosing ? 'exit' : 'visible'}
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ pointerEvents: isTop ? 'auto' : 'none' }}
            >
              <motion.div
                //@ts-ignore allow motion props
                className="modal-wrapper"
                onClick={(e: MouseEvent) => e.stopPropagation()}
                variants={wrapperVariants}
                initial="hidden"
                animate={isClosing ? 'exit' : 'visible'}
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {modalContent}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
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
