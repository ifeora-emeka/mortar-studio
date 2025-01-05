import {MortarStyle} from "../schemas/styles.schema.js";
import {MortarVariable} from "../schemas/variables.schema.js";

/**
 * Converts a MortarStyle object to an array of Tailwind CSS class strings.
 *
 * This function processes the given MortarStyle object and generates an array of Tailwind CSS class strings.
 * It handles different style modes (default, dark, hover, focus, etc.) and breakpoints (default, md, lg, xl, etc.).
 *
 * The function performs the following steps:
 * 1. Iterates over each breakpoint and mode in the MortarStyle object.
 * 2. For each style property, it checks if the value is a reference to a variable.
 * 3. If the value is a reference, it retrieves the actual value from the provided variables array.
 * 4. Formats the style property key from camelCase to kebab-case.
 * 5. Wraps the value in square brackets to create a Tailwind CSS class string.
 * 6. Adds the generated class string to the classList array.
 *
 * @param {MortarStyle} style - The MortarStyle object containing style properties.
 * @param {MortarVariable[]} [variables] - An optional array of MortarVariable objects for resolving variable references.
 * @returns {string[]} An array of Tailwind CSS class strings.
 */
export const convertMortarStyleToTailwindClasses = (style: MortarStyle, variables?: MortarVariable[]): string[] => {
    const staticValue = ['center', 'start', 'justify', 'end'];
    const classList: string[] = [];
    const refPattern = /^ref::\w+::([\w-]+)$/;

    const getVariableValue = (ref: string): string | undefined => {
        const match = ref.match(refPattern);
        if (match && variables) {
            const variable = variables.find(v => v.id === match[1]);
            return variable ? variable.lightValue : undefined;
        }
        return undefined;
    };

    const formatKey = (key: string): string | undefined => {
        return key.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')[0];
    };

    const addClasses = (styles: Record<string, string>, prefix: string = '') => {
        for (const [key, value] of Object.entries(styles)) {
            const actualValue = refPattern.test(value) ? getVariableValue(value) : value;
            if (actualValue) {
                if (key.startsWith('$')) {
                    classList.push(actualValue);
                } else {
                    const formattedValue = `[${actualValue}]`;
                    classList.push(`${prefix}${formatKey(key)}-${formattedValue}`);
                }
            }
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