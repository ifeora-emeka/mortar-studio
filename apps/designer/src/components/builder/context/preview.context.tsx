import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {MortarComponent} from '@repo/common/schema/component';
import {MortarElementInstance} from '@repo/common/schema/instance';
import {MortarStyle} from '@repo/common/schema/styles'
import {MortarVariable, MortarVariableSet} from '@repo/common/schema/variables';
import {MortarPage} from '@repo/common/schema/page';
import {MortarElement} from '@repo/common/schema/element'
import axios from "axios";
import {LOCAL_API_URL} from "@/components/builder/config/api.config.ts";
import {toast} from "@/hooks/use-toast.ts";
import {GoogleFont} from "@repo/common/schema/config";

type Mode = 'light' | 'dark' | 'system';

interface PreviewState {
    fonts: GoogleFont[];
    pages: MortarPage[];
    components: MortarComponent[];
    styles: MortarStyle[];
    instances: MortarElementInstance[];
    variableSets: (MortarVariableSet & { new?: boolean })[];
    variables: MortarVariable[];
    activePage: MortarPage | null;
    activePageInstances: MortarElementInstance[];
    activeComponents: MortarComponent[];
    mode: Mode;
    activeElements: MortarElement[];
    activeBreakpoint: 'default' | 'md'| 'lg' | 'xl';
    activeState: 'default' | 'hover' | 'focus' | 'active';
}

interface PreviewContextProps {
    state: PreviewState;
    setPreviewState: (newState: Partial<PreviewState>) => void;
    pushToArray: <T>(key: keyof PreviewState, data: T) => void;
    removeFromArray: (key: keyof PreviewState, id: string) => void;
    sendSync: () => Promise<unknown>;
    updateItemInArray: <T>(params: {
        index: number;
        key: keyof PreviewState;
        data: Partial<T>
    }) => void;
}

const PreviewContext = createContext<PreviewContextProps | undefined>(undefined);

export const usePreviewContext = () => {
    const context = useContext(PreviewContext);
    if (!context) {
        throw new Error('usePreviewContext must be used within a PreviewProvider');
    }
    return context;
};

export const PreviewProvider = ({children}: { children: ReactNode }) => {
    const [state, setState] = useState<PreviewState>({
        pages: [],
        components: [],
        variableSets: [],
        variables: [],
        activePageInstances: [],
        styles: [],
        instances: [],
        activeComponents: [],
        activePage: null,
        activeElements: [],
        mode: 'system',
        activeBreakpoint: 'lg',
        activeState: 'default',
        fonts: []
    });


    const setPreviewState = (newState: Partial<PreviewState>) => {
        setState((prevState) => ({...prevState, ...newState}));
    };

    const sendSync = async () => {
        const {variableSets, variables, components, pages, styles, instances} = state;
        try {
            const response = await axios.post(LOCAL_API_URL + '/sync', {
                variableSets,
                variables,
                components: components.map((comp: MortarComponent) => ({
                    ...comp,
                    elements: comp.elements.map((el: MortarElement) => ({
                        ...el,
                        children: []
                    }))
                } as MortarComponent)),
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

    const updateItemInArray = <T, >(params: {
        index: number;
        key: keyof PreviewState;
        data: Partial<T>
    }) => {
        const {index, key, data} = params;
        setState((prevState) => ({
            ...prevState,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            [key]: prevState[key].map((item, i) =>
                i === index ? {...item, ...data} : item
            ),
        }));
    };

    const pushToArray = <T, >(key: keyof PreviewState, data: T) => {
        console.log('PUSH TO ARRAY:', key, data)
        setState((prevState) => ({
            ...prevState,
            [key]: [...(prevState[key] as T[]), data],
        }));
    };

    const removeFromArray = <T, >(key: keyof PreviewState, id: string) => {
        setState((prevState) => ({
            ...prevState,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            [key]: (prevState[key] as T[]).filter((item) => item.id !== id),
        }));
    };

    useEffect(() => {
        if (state.pages.length > 0 && !state.activePage) {
            const activePage = state.pages.find(page => page.route == "/");
            if (activePage) {
                setPreviewState({
                    activePage
                })
            }
        }
    }, [state.pages])

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            sendSync();
        }, 9000);

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [state.components, state.pages, state.variables, state.variableSets, state.styles, state.instances]);

    // console.log('PREVIEW CONTEXT::::', state)

    return (
        <PreviewContext.Provider
            value={{
                state,
                setPreviewState,
                updateItemInArray,
                pushToArray,
                removeFromArray,
                sendSync,
            }}
        >
            {children}
        </PreviewContext.Provider>
    );
};