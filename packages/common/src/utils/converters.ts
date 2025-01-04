import {MortarStyle} from "../schemas/styles.schema.js";
import {MortarVariable} from "../schemas/variables.schema.js";

export const convertMortarStyleToTailwindClasses = (style: MortarStyle, variables?: MortarVariable[]): string[] => {
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
                const formattedValue = `[${actualValue}]`;
                classList.push(`${prefix}${formatKey(key)}-${formattedValue}`);
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