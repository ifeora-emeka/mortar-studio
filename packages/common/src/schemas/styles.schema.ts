import * as z from 'zod';
import knownCssProperties from 'known-css-properties';

const cssProperties = knownCssProperties.all;

export const CssPropertiesSchema = z.object(
    cssProperties.reduce((acc, prop) => {
        acc[prop] = z.string().optional();
        return acc;
    }, {} as Record<string, z.ZodString | z.ZodOptional<z.ZodString>>)
);

export const CreateMortarStyleSchema = z.object({
    default: CssPropertiesSchema,
    dark: CssPropertiesSchema,
    hover: CssPropertiesSchema,
    focus: CssPropertiesSchema,
});

export type MortarStyleMode = {
    default: Record<string, string>,
    dark?: Record<string, string>,
    hover?: Record<string, string>,
    focus?: Record<string, string>,
    active?: Record<string, string>,
}

export type MortarStyle = {
    default: MortarStyleMode,
    md?: MortarStyleMode,
    lg?: MortarStyleMode,
    xl?: MortarStyleMode,
};
