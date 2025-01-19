import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import {useElementStyle} from "@/components/builder/hooks/style.hook.tsx";
import FileSelectorInput
    from "@/components/builder/designer/components/designer-inputs/FileSelectorInput.tsx";

export default function BackgroundImageProperty() {
    const {value, handleSave, variable} = useElementStyle("bg");

    return (
        <PropertySection
            label={'Image'}
        >
            <FileSelectorInput
                value={value}
                onChange={e => handleSave(`bg-[url-(${e})]`)}
                variable={variable}
            />
        </PropertySection>
    );
}