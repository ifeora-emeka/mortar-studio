import * as z from 'zod';

export const HtmlAttributesSchema = z.record(z.string(), z.string().optional());

export const CreateMortarElementSchema = z.object({
    htmlTag: z.string(),
    attributes: HtmlAttributesSchema.optional().default({}),
    chakraProps: z.object({}).optional().default({}),
    customProps: z.object({}).optional().default({}),
});

export type MortarElement = {
    id: string;
    index: number;
    htmlTag: string;
    attributes: Record<string, string>;
    chakraProps: Record<string, any>;
    customProps: Record<string, any>;
}
export type CreateElement = z.infer<typeof CreateMortarElementSchema>;