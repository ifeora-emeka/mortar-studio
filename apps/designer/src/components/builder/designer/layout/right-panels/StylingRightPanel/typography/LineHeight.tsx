import MeasurementInput
    from "@/components/builder/designer/components/designer-inputs/MeasurementInput.tsx";
import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import {useElementStyle} from "@/components/builder/hooks/style.hook.tsx";

export default function LineHeight(){
    const {value, handleSave, variable} = useElementStyle("leading");
    return <>
        <PropertySection
            label={'Line height'}
            onVariableConnect={handleSave}
            variable={variable}
        >
            <MeasurementInput value={value} onChange={handleSave} variable={variable}/>
        </PropertySection>
    </>
}
