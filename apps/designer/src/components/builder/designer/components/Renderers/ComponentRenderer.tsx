import {MortarComponent} from "@repo/common/schema/component";
import {compileElements} from "@repo/common/utils";
import ElementRenderer
    from "@/components/builder/designer/components/Renderers/ElementRenderer.tsx";
import {MortarElementInstance} from "@repo/common/schema/instance";

export default function ComponentRenderer({component, instance}: {
    component: MortarComponent;
    instance: MortarElementInstance;
}) {
    const elements = compileElements(component.elements);

    return (
        <>
            {elements.map(element => (
                <ElementRenderer
                    key={element.id}
                    element={element}
                    instance={instance}
                    component={component}
                />
            ))}
        </>
    );
}