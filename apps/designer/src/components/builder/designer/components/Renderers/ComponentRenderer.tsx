import {MortarComponent} from "@repo/common/schema/component";
import {compileElements} from "@repo/common/utils";
import ElementRenderer
    from "@/components/builder/designer/components/Renderers/ElementRenderer/ElementRenderer.tsx";
import {MortarElementInstance} from "@repo/common/schema/instance";
import {MortarElement} from "@repo/common/schema/element";
import {MortarVariable} from "@repo/common/schema/variables";

export default function ComponentRenderer({component, instance, activeElements, components, instances, variables}: {
    component: MortarComponent;
    instance: MortarElementInstance;
    activeElements: MortarElement[];
    components: MortarComponent[];
    instances: MortarElementInstance[];
    variables: MortarVariable[]
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
                    activeElements={activeElements}
                    components={components}
                    instances={instances}
                    variables={variables}
                />
            ))}
        </>
    );
}