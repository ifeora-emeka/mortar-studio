import * as z from 'zod';

export const MortarPageSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    route: z.string(),
});

export const CreatePageSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    route: z.string(),
});

export interface MortarPage {
    id: string;
    title: string;
    slug: string;
    description: string;
    route: string;
}
