import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { APISyncData } from '@repo/common/schema/api'
import {LOCAL_API_URL} from "@/components/builder/config/api.config.ts";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";

interface APIContextProps {
    isLoading: boolean;
    sendSync: () => void;
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

export const APIProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { state: {variableSets, variables, components, pages} } = usePreviewContext();

    const sendSync = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(LOCAL_API_URL + '/sync', {
                variableSets,
                variables,
                components,
                pages
            });
            return response.data;
        } catch (error) {
            console.error('Error in sendSync:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const getSync = async (url: string) => {
        setIsLoading(true);
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error in getSync:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <APIContext.Provider value={{ isLoading, sendSync, getSync }}>
            {children}
        </APIContext.Provider>
    );
};