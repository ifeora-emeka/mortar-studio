import { createContext, useContext, useState, ReactNode } from 'react';

type Panel = 'pages' | 'layers' | 'styles' | 'components' | 'blocks' | 'variables' | 'settings';

interface LeftPanelState {
  activePanel: Panel | null;
}

interface LeftPanelContextProps {
  state: LeftPanelState;
  setLeftPanelState: (newState: Partial<LeftPanelState>) => void;
  toggleLeftPanel: (panel: Panel) => void;
}

const LeftPanelContext = createContext<LeftPanelContextProps | undefined>(undefined);

export const useLeftPanelContext = () => {
  const context = useContext(LeftPanelContext);
  if (!context) {
    throw new Error('useLeftPanelContext must be used within a LeftPanelProvider');
  }
  return context;
};

export const LeftPanelProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<LeftPanelState>({ activePanel: null });

  const setLeftPanelState = (newState: Partial<LeftPanelState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }

  const toggleLeftPanel = (panel: Panel) => {
    setLeftPanelState({ activePanel: state.activePanel === panel ? null : panel });
  }

  return (
    <LeftPanelContext.Provider value={{ state, setLeftPanelState, toggleLeftPanel }}>
      {children}
    </LeftPanelContext.Provider>
  );
};