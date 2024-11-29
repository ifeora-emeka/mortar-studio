import { createContext, useContext, useState, ReactNode } from 'react';

type Panel = 'styling' | 'custom-properties' | 'attributes';

interface RightPanelState {
  activePanel: Panel | null;
}

interface RightPanelContextProps {
  state: RightPanelState;
  setRightPanelState: (newState: Partial<RightPanelState>) => void;
  toggleRightPanel: (panel: Panel) => void;
}

const RightPanelContext = createContext<RightPanelContextProps | undefined>(undefined);

export const useRightPanelContext = () => {
  const context = useContext(RightPanelContext);
  if (!context) {
    throw new Error('useRightPanelContext must be used within a RightPanelProvider');
  }
  return context;
};

export const RightPanelProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<RightPanelState>({ activePanel: null });

  const setRightPanelState = (newState: Partial<RightPanelState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }

  const toggleRightPanel = (panel: Panel) => {
    setRightPanelState({ activePanel: state.activePanel === panel ? null : panel });
  }

  return (
    <RightPanelContext.Provider value={{ state, setRightPanelState, toggleRightPanel }}>
      {children}
    </RightPanelContext.Provider>
  );
};