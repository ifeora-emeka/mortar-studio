import * as z from 'zod';
import { CssPropertiesSchema } from './styles.schema.js'

export const CreateMortarElementSchema = z.object({
    htmlTag: z.string(),
    parent_element_id: z.string().nullable(),
    attributes: z.object({}),
    customProps: z.object({}),
    styles: CssPropertiesSchema,
});

export type MortarElement = {
    id: string;
    index: number;
    parent_element_id: string | null;
    htmlTag: string;
    attributes: Record<string, string>;
    customProps: Record<string, any>;
}
