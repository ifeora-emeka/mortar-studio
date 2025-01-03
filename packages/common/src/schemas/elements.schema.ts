import * as z from 'zod';
import {CssPropertiesSchema, MortarStyle} from './styles.schema.js'


export const CreateMortarElementSchema = z.object({
    htmlTag: z.string(),
    parent_element_id: z.string().nullable(),
    attributes: z.object({}),
    style: CssPropertiesSchema,
    textContent: z.string().nullable(),
});

export type MortarElement = {
    id: string;
    index: number;
    name: string;
    parent_element_id: string | null;
    htmlTag: string;
    attributes: Record<string, string>;
    style: Record<string, any>; // regular react in-line styling
    children: MortarElement[];
    textContent: string | null;
    tailwindStyles: MortarStyle;
}
