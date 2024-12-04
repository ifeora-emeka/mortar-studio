import { createContext, useContext, useState, ReactNode } from 'react';
import { MortarComponent } from '@repo/common/schema/component';
import { MortarElementInstance } from '@repo/common/schema/instance';
import { MortarVariable, MortarVariableSet } from '@repo/common/schema/variables';
import { MortarPage } from '@repo/common/schema/page';

type Mode = 'light' | 'dark' | 'system';

interface PreviewState {
    pages: MortarPage[];
    components: MortarComponent[];
    variableSets: (MortarVariableSet & { new?: boolean })[];
    variables: MortarVariable[];
    activePageID: string | null;
    activePageInstances: MortarElementInstance[];
    mode: Mode;
}

interface PreviewContextProps {
    state: PreviewState;
    setPreviewState: (newState: Partial<PreviewState>) => void;
    pushToArray: <T>(key: keyof PreviewState, data: T) => void;
    updateItemInArray: <T>(params: { index: number; key: keyof PreviewState; data: Partial<T> }) => void;
}

const PreviewContext = createContext<PreviewContextProps | undefined>(undefined);

export const usePreviewContext = () => {
    const context = useContext(PreviewContext);
    if (!context) {
        throw new Error('usePreviewContext must be used within a PreviewProvider');
    }
    return context;
};

export const PreviewProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<PreviewState>({
        pages: [],
        components: [],
        variableSets: [],
        variables: [],
        activePageID: null,
        activePageInstances: [],
        mode: 'system',
    });

    const setPreviewState = (newState: Partial<PreviewState>) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };

    const updateItemInArray = <T,>(params: { index: number; key: keyof PreviewState; data: Partial<T> }) => {
        const { index, key, data } = params;
        setState((prevState) => ({
            ...prevState,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            [key]: prevState[key].map((item, i) =>
                i === index ? { ...item, ...data } : item
            ),
        }));
    };

    const pushToArray = <T,>(key: keyof PreviewState, data: T) => {
        setState((prevState) => ({
            ...prevState,
            [key]: [...(prevState[key] as T[]), data],
        }));
    };

    console.log('PreviewProvider', state);

    return (
        <PreviewContext.Provider
            value={{
                state,
                setPreviewState,
                updateItemInArray,
                pushToArray,
            }}
        >
            {children}
        </PreviewContext.Provider>
    );
};