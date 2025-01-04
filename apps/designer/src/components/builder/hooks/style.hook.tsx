import {useState, useEffect} from "react";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";
import {MortarVariable} from "@repo/common/schema/variables";

export const useElementStyle = (styleKey: string) => {
    const {
        state: {
            activeElements,
            activeBreakpoint,
            activeState,
            variables
        }
    } = usePreviewContext();
    const {updateElementTailwindStyles} = useElement();

    const originalValue = activeElements?.[0]?.tailwindStyles?.[activeBreakpoint]?.[activeState]?.[styleKey];
    const currentValue = originalValue?.includes('ref::') ? variables.filter(x => x.id === originalValue?.split("::")[2])[0]?.lightValue : originalValue;
    const variable: MortarVariable | null = variables.filter(x => x.id === originalValue?.split("::")[2])[0];
    const [value, setValue] = useState(currentValue || '');

    const handleSave = (newValue: string) => {
        updateElementTailwindStyles({[styleKey]: newValue});
    };

    useEffect(() => {
        setValue(currentValue || '');
    }, [activeElements, activeBreakpoint, activeState, variables]);

    return {
        value,
        setValue,
        handleSave,
        originalValue,
        currentValue,
        variable,
        previewState: {activeElements, activeBreakpoint, activeState, variables}
    };
};