import ColorInput
    from "@/components/builder/designer/components/designer-inputs/ColorInput.tsx";
import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import {useElementStyle} from "@/components/builder/hooks/style.hook.tsx";

export default function BorderColorProperty() {
    const {value, handleSave, variable} = useElementStyle("$borderColor")

    return <>
        <PropertySection label={'Color'}>
            <ColorInput
                value={value}
                onChange={e => handleSave(`border-[${e}]`)}
                variable={variable}
            />
        </PropertySection>
    </>
}
