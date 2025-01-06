import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import MeasurementInput
    from "@/components/builder/designer/components/designer-inputs/MeasurementInput.tsx";
import {useElementStyle} from "@/components/builder/hooks/style.hook.tsx";

export default function MaxWidthProperty() {
    const {value, handleSave, variable} = useElementStyle("max-w");

    return (
        <PropertySection
            label={'Max width'}
            onVariableConnect={handleSave}
            variable={variable}
        >
            <MeasurementInput value={value} onChange={handleSave} variable={variable}/>
        </PropertySection>
    );
}