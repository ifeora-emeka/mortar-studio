import * as z from 'zod';
import { MortarElement } from "./elements.schema.js";

export const CreateComponentSchema = z.object({
    // htmlTag: z.string(),
    name: z.string()
});

export type MortarComponent = {
    id: string;
    name: string;
    attributes: Record<string, string>;
    // htmlTag: string;
    elements: MortarElement[];
}
