import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import MeasurementInput
    from "@/components/builder/designer/components/designer-inputs/MeasurementInput.tsx";
import {useElementStyle} from "@/components/builder/hooks/style.hook.tsx";

export default function BorderWidthProperty() {
    const {value, handleSave, variable} = useElementStyle("$borderWidth");

    return (
        <PropertySection
            label={'Width'}
            onVariableConnect={e => handleSave(`border-[${e}]`)}
            variable={variable}
        >
            <MeasurementInput
                value={value}
                onChange={e => handleSave(`border-[${e}]`)}
                variable={variable}
            />
        </PropertySection>
    );
}