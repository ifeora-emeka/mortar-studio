import * as z from 'zod';
import { MortarElement } from "./elements.schema.js";

export const CreateComponentSchema = z.object({
    chakraProps: z.object({}),
    htmlTag: z.string(),
});

export type MortarComponent = {
    id: string;
    name: string;
    chakraProps: Record<string, any>;
    attributes: Record<string, string>;
    htmlTag: string;
    elements: MortarElement[];
}
