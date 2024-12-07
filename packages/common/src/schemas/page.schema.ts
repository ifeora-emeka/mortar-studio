import * as z from 'zod';

export const CreateMortarPageSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    route: z.string(),
    isStatic: z.boolean().optional(),
});

export interface MortarPage {
    id: string;
    title: string;
    slug: string;
    description: string;
    route: string;
    isStatic?: boolean;
}
