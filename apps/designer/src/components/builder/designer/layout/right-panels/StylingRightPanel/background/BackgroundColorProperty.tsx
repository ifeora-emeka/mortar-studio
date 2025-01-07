import ColorInput from "@/components/builder/designer/components/designer-inputs/ColorInput.tsx";
import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import {useElementStyle} from "@/components/builder/hooks/style.hook.tsx";

export default function BackgroundColorProperty() {
    const {value, handleSave, variable} = useElementStyle("bg");

    return (
        <PropertySection
            label={'Color'}
            onVariableConnect={handleSave}
            variable={variable}
        >
            <ColorInput value={value} onChange={handleSave} variable={variable}/>
        </PropertySection>
    );
}