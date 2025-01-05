import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import MeasurementInput
    from "@/components/builder/designer/components/designer-inputs/MeasurementInput.tsx";
import {useElementStyle} from "@/components/builder/hooks/style.hook.tsx";

export default function GapYProperty() {
    const {value, handleSave, variable} = useElementStyle("$gap");

    return (
        <PropertySection
            label={'Gap Y'}
            variable={variable}
        >
            <MeasurementInput
                value={value}
                onChange={e => handleSave(`gap-y-[${e}]`)}
                variable={variable}
            />
        </PropertySection>
    );
}