import ColorInput from "@/components/builder/designer/components/ColorInput.tsx";
import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import { useElementStyle } from "@/components/builder/hooks/style.hook.tsx";

export default function BackgroundColorProperty() {
    const { value, handleSave, hasVariable } = useElementStyle("bg");

    return (
        <PropertySection label={'Background color'} onVariableConnect={handleSave} armed={hasVariable}>
            <ColorInput value={value} onChange={handleSave} />
        </PropertySection>
    );
}