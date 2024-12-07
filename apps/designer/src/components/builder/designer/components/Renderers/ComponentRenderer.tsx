import { MortarComponent } from "@repo/common/schema/component";
import { compileElements } from "@repo/common/utils";
import ElementRenderer from "@/components/builder/designer/components/Renderers/ElementRenderer.tsx";

export default function ComponentRenderer({ component }: { component: MortarComponent }) {
    const elements = compileElements(component.elements);

    return (
        <>
            {elements.map(element => (
                <ElementRenderer key={element.id} element={element} />
            ))}
        </>
    );
}