import * as z from 'zod';
import { MortarElement } from "./elements.schema.js";


export const CreateComponentSchema = z.object({
    // htmlTag: z.string(),
    name: z.string(),
});

export type MortarComponent = {
    id: string;
    name: string;
    props: MortarComponentProps[];
    elements: MortarElement[];
}

export interface MortarComponentProps {
    id: string;
    label: string;
    defaultValue?: any;
    dataType: 'string' | 'number' | 'boolean' | 'array' | 'object';
    isRequired?: boolean;
}

export const MortarComponentPropsSchema = z.object({
    id: z.string(),
    label: z.string(),
    value: z.any(),
    defaultValue: z.any().optional(),
    dataType: z.enum(['string', 'number', 'boolean', 'array', 'object']),
    isRequired: z.boolean(),
});

