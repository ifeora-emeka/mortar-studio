import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import {useElementStyle} from "@/components/builder/hooks/style.hook.tsx";
import NumberSliderInput
    from "@/components/builder/designer/components/designer-inputs/NumberSliderInput.tsx";

export default function BackgroundOpacity() {
    const {value, handleSave, variable} = useElementStyle("$bgOpacity");

    return (
        <PropertySection
            label={'Opacity'}
            onVariableConnect={handleSave}
            variable={variable}
        >
            <NumberSliderInput
                value={Number(value.match(/\d+/g))}
                // onChange={e => handleSave(`bg-opacity-${e}`)}
                onChange={e => handleSave(`op-${e}`)}
            />
        </PropertySection>
    );
}