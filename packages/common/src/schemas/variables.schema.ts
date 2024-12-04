import * as z from 'zod';

export const CreateVariableSchema = z.object({
    name: z.string(),
    index: z.number(),
    type: z.enum(['color', 'measurement', 'boolean', 'text']),
    value: z.string(),
    isDarkMode: z.boolean(),
    setID: z.string()
});

export type MortarVariable = {
    id: string;
    index: number;
    slug: string;
    name: string;
    type: 'color' | 'measurement' | 'boolean' | 'text';
    value: string; // Ex. 23px 35rem 'true' 'false' '#ffffff'
    isDarkMode: boolean;
    setID: string;
    isStatic: boolean;
};

export const CreateVariableSetSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    index: z.number(),
});

export type MortarVariableSet = {
    id: string;
    name: string;
    slug: string;
    index: number;
}
