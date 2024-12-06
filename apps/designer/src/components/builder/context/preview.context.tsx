import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import { MortarComponent } from '@repo/common/schema/component';
import { MortarElementInstance } from '@repo/common/schema/instance';
import { MortarStyle } from '@repo/common/schema/styles'
import { MortarVariable, MortarVariableSet } from '@repo/common/schema/variables';
import { MortarPage } from '@repo/common/schema/page';
import axios from "axios";
import {LOCAL_API_URL} from "@/components/builder/config/api.config.ts";
import {toast} from "@/hooks/use-toast.ts";

type Mode = 'light' | 'dark' | 'system';

interface PreviewState {
    pages: MortarPage[];
    components: MortarComponent[];
    styles: MortarStyle[];
    instances: MortarElementInstance[];
    variableSets: (MortarVariableSet & { new?: boolean })[];
    variables: MortarVariable[];
    activePage: MortarPage | null;
    activePageInstances: MortarElementInstance[];
    mode: Mode;
}

interface PreviewContextProps {
    state: PreviewState;
    setPreviewState: (newState: Partial<PreviewState>) => void;
    pushToArray: <T>(key: keyof PreviewState, data: T) => void;
    removeFromArray: (key: keyof PreviewState, id: string) => void;
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
        activePageInstances: [],
        styles: [],
        instances: [],
        activePage: null,
        mode: 'system',
    });

    const setPreviewState = (newState: Partial<PreviewState>) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };

    const sendSync = async () => {
        const { variableSets, variables, components, pages, styles, instances } = state;
        try {
            const response = await axios.post(LOCAL_API_URL + '/sync', {
                variableSets,
                variables,
                components,
                pages,
                styles,
                instances
            });
            toast({
                title: "Progress saved",
            });
            return response.data;
        } catch (error) {
            toast({
                title: "Error syncing project",
                description: "Changes you've made will not be saved",
                variant: 'destructive'
            });
            console.error('Error in sendSync:', error);
            throw error;
        }
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

    const removeFromArray = <T,>(key: keyof PreviewState, id: string) => {
        setState((prevState) => ({
            ...prevState,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            [key]: (prevState[key] as T[]).filter((item) => item.id !== id),
        }));
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            sendSync();
        }, 5000);

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [state]);

    useEffect(() => {
        const savedState = localStorage.getItem('mortar-preview');
        if (savedState) {
            setState(JSON.parse(savedState));
        }
    }, []);

    return (
        <PreviewContext.Provider
            value={{
                state,
                setPreviewState,
                updateItemInArray,
                pushToArray,
                removeFromArray
            }}
        >
            {children}
        </PreviewContext.Provider>
    );
};