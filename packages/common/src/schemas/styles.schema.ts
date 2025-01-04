import * as z from 'zod';
import knownCssProperties from 'known-css-properties';
import { Properties as CSSProperties } from 'csstype';

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
    default: Partial<CSSProperties>,
    dark?: Partial<CSSProperties>,
    hover?: Partial<CSSProperties>,
    focus?: Partial<CSSProperties>,
    active?: Partial<CSSProperties>,
}

export type MortarStyle = {
    default: MortarStyleMode,
    md?: MortarStyleMode,
    lg?: MortarStyleMode,
    xl?: MortarStyleMode,
};
