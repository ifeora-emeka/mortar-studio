import {MortarStyle} from "../schemas/styles.schema.js";

export const convertMortarStyleToTailwindClasses = (style: MortarStyle): string[] => {
    const classList: string[] = [];

    const addClasses = (styles: Record<string, string>, prefix: string = '') => {
        for (const [key, value] of Object.entries(styles)) {
            const formattedValue = value.includes('#') || value.includes('px') ? `[${value}]` : value;
            classList.push(`${prefix}${key}-${formattedValue}`);
        }
    };

    for (const [breakpoint, modes] of Object.entries(style)) {
        for (const [mode, styles] of Object.entries(modes)) {
            const prefix = breakpoint === 'default' ? '' : `${breakpoint}:`;
            const modePrefix = mode === 'default' ? '' : `${mode}:`;
            addClasses(styles, `${prefix}${modePrefix}`);
        }
    }

    return classList;
};
