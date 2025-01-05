import { z } from 'zod';

const GoogleFontSchema = z.object({
    family: z.string(),
    variants: z.array(z.string()),
    subsets: z.array(z.string()),
    version: z.string(),
    lastModified: z.string(),
    files: z.record(z.string(), z.string()),
    category: z.string(),
    kind: z.string(),
    menu: z.string()
});

export const CreateAppConfigSchema = z.object({
    title: z.string(),
    description: z.string(),
    fonts: z.array(GoogleFontSchema)
});

export type GoogleFont = {
    family: string;
    variants: string[];
    subsets: string[];
    version: string;
    lastModified: string;
    files: Record<string, string>;
    category: string;
    kind: string;
    menu: string;
};