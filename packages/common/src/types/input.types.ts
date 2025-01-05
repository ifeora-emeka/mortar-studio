import {MortarVariable} from "../schemas/variables.schema.js";

export type DesignerInputProps = {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
    variable?: MortarVariable;
    debounceDelay?: number;
}
