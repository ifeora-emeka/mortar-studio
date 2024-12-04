import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { MortarComponent } from '@repo/common/schema/component'
import { MortarElementInstance } from '@repo/common/schema/instance'
import { MortarVariable, MortarVariableSet } from '@repo/common/schema/variables'
import { MortarStyle } from '@repo/common/schema/styles'
import { MortarPage } from '@repo/common/schema/page'

interface APIContextProps {
    isLoading: boolean;
    sendSync: (url: string, data: APISyncData) => Promise<APISyncData>;
    getSync: (url: string) => Promise<APISyncData>;
}

export interface APISyncData {
    components: MortarComponent[];
    instances: MortarElementInstance[];
    variableSets: MortarVariableSet[];
    variables: MortarVariable[];
    styles: MortarStyle[];
    pages: MortarPage[];
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

    const sendSync = async (url: string, data: APISyncData) => {
        setIsLoading(true);
        try {
            const response = await axios.post(url, data);
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