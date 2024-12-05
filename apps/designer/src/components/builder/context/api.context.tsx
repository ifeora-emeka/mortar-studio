import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import axios from 'axios';
import {APISyncData} from '@repo/common/schema/api'
import {LOCAL_API_URL} from "@/components/builder/config/api.config.ts";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";

interface APIConfigState {
    isLoading: boolean;
    lastSync: number;
    lastUpdate: number;
}

interface APIContextProps {
    state: APIConfigState;
    getSync: (url: string) => Promise<APISyncData>;
}

const APIContext = createContext<APIContextProps | undefined>(undefined);

export const useAPIContext = () => {
    const context = useContext(APIContext);
    if (!context) {
        throw new Error('useAPIContext must be used within an APIProvider');
    }
    return context;
};

export const APIProvider = ({children}: { children: ReactNode }) => {
    const [state, setState] = useState({
        isLoading: true,
        lastSync: 0,
        lastUpdate: 0
    })
    const {
        setPreviewState
    } = usePreviewContext();

    const setAPIContextState = (newSate: Partial<APIConfigState>) => {

        setState((prevState: APIConfigState) => ({
            ...prevState,
            ...newSate
        }));
    }


    const getSync = async () => {
        setAPIContextState({isLoading: true});
        try {
            const response = await axios.get(`${LOCAL_API_URL}/sync`);
            setPreviewState({
                variableSets: response.data.variableSets,
                variables: response.data.variables,
                components: response.data.components,
                pages: response.data.pages
            })
            return response.data;
        } catch (error) {
            console.error('Error in getSync:', error);
            throw error;
        } finally {
            setAPIContextState({isLoading: false});
        }
    };

    useEffect(() => {
        window.addEventListener('storage', () => {
            setAPIContextState({lastUpdate: Date.now()});
        });
        getSync();
    }, []);

    return (
        <APIContext.Provider value={{state, getSync}}>
            {children}
        </APIContext.Provider>
    );
};