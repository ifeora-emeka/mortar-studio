import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import MeasurementInput
    from "@/components/builder/designer/components/designer-inputs/MeasurementInput.tsx";
import {useElementStyle} from "@/components/builder/hooks/style.hook.tsx";

export default function TopProperty() {
    const {value, handleSave, variable} = useElementStyle("top");

    return (
        <PropertySection
            label={'Top'}
            onVariableConnect={handleSave}
            variable={variable}
        >
            <MeasurementInput value={value} onChange={handleSave} variable={variable}/>
        </PropertySection>
    );
}