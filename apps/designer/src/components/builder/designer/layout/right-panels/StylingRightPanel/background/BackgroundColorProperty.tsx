import ColorInput from "@/components/builder/designer/components/ColorInput.tsx";
import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";
import {useEffect, useState} from "react";

export default function BackgroundColorProperty() {
    const {state: {activeElements, activeBreakpoint, activeState, variables}} = usePreviewContext();
    const {updateElementTailwindStyles} = useElement();
    const originalValue = activeElements?.[0]?.tailwindStyles?.[activeBreakpoint]?.[activeState]?.bg;
    const currentValue = originalValue?.includes('ref::') ? variables.filter(x => x.id === originalValue?.split("::")[2])[0]?.lightValue : originalValue;
    const [value, setValue] = useState(currentValue || '#ffffff');


    const handleSave = (bg: string) => {
        updateElementTailwindStyles({bg})
    }

    useEffect(() => {
        setValue(currentValue || '#ffffff');
    }, [activeElements, activeBreakpoint, activeState, variables]);

    return <>
        <PropertySection label={'Background color'} onVariableConnect={handleSave}>
            <ColorInput
                value={value}
                onChange={handleSave}
            />
        </PropertySection>
    </>
}
