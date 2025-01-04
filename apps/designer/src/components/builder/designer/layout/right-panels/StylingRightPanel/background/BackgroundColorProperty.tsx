import ColorInput from "@/components/builder/designer/components/ColorInput.tsx";
import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";
import {useEffect, useState} from "react";

export default function BackgroundColorProperty() {
    const {state: {activeElements, activeBreakpoint, activeState}} = usePreviewContext();
    const {updateElementTailwindStyles} = useElement();
    const currentValue = activeElements?.[0]?.tailwindStyles?.[activeBreakpoint]?.[activeState]?.backgroundColor;
    const [value, setValue] = useState(currentValue || '#ffffff');

    useEffect(() => {
        setValue(currentValue || '#ffffff');
    },[activeElements, activeBreakpoint, activeState]);

    useEffect(() => {
        if(value ! == currentValue) {
            updateElementTailwindStyles({backgroundColor: value});
        }
    },[value])

    if(currentValue) return null;

    return <>
        <PropertySection label={'Background color'}>
            <ColorInput value={value} onChange={setValue}/>
        </PropertySection>
    </>
}
