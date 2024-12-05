import * as z from 'zod';

export const CreateVariableSchema = z.object({
    name: z.string(),
    index: z.number(),
    type: z.enum(['color', 'measurement', 'boolean', 'text']),
    lightValue: z.string(),
    darkValue: z.string().nullable(),
    setID: z.string()
});

export type MortarVariableType = 'color' | 'measurement' | 'boolean' | 'text';

export type MortarVariable = {
    id: string;
    index: number;
    slug: string;
    name: string;
    type: MortarVariableType;
    lightValue: string;
    darkValue: string | null;
    setID: string;
    isStatic?: boolean;
    new?: boolean;
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
    isStatic?: boolean;
}
