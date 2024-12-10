import * as z from 'zod';
import {MortarComponentPropsSchema} from "./components.schema.js";

export const CreateMortarInstanceSchema: z.ZodSchema = z.lazy(() => z.object({
    index: z.number(),
    ref: z.string().regex(/^ref::[a-zA-Z0-9_]+::[a-zA-Z0-9_]+$/, { message: "Invalid reference format." }),
    incomingProps: MortarComponentPropsSchema,
    parentInstance: z.string().nullable(),
    children: z.array(CreateMortarInstanceSchema),
    // page_id: z.string(),
}));

export type InstanceProps = {
    label: string;
    value: any;
    defaultValue?: any;
    dataType: 'string' | 'number' | 'boolean' | 'array' | 'object';
    isRequired: boolean;
}

export type MortarElementInstance = {
    id: string;
    index: number;
    parentInstance: string | null;
    ref: string;
    page_id: string;
    incomingProps: InstanceProps[];
    children: MortarElementInstance[];
}
