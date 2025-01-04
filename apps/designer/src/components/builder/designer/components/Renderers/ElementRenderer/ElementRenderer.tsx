import React from "react";
import {MortarElement} from "@repo/common/schema/element";
import {MortarElementInstance} from "@repo/common/schema/instance";
import {MortarComponent} from "@repo/common/schema/component";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";
import EachElementMenu
    from "@/components/builder/designer/components/Renderers/ElementRenderer/EachElementMenu.tsx";
import InstanceRenderer
    from "@/components/builder/designer/components/Renderers/InstanceRenderer.tsx";
import {convertMortarStyleToTailwindClasses} from '@repo/common/utils'
import {cn} from "@/lib/utils.ts";
import {MortarVariable} from "@repo/common/schema/variables";

const voidElements = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"
]);

export default function ElementRenderer(
    {
        element,
        instance,
        component,
        activeElements,
        components,
        instances,
        variables
    }: {
        element: MortarElement;
        instance: MortarElementInstance;
        component: MortarComponent;
        activeElements: MortarElement[];
        components: MortarComponent[];
        instances: MortarElementInstance[];
        variables: MortarVariable[]
    }) {
    const {setActiveElement} = useElement();
    const mortarStudioID = `ref::${instance.id}::${component.id}::${element.id}`;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveElement({element, component, instance});
    };

    const Tag = element.htmlTag as keyof JSX.IntrinsicElements;

    const childInstances = instances?.filter(childInstance => childInstance.parentElement === element.id);

    const tailwindClassList = convertMortarStyleToTailwindClasses(element.tailwindStyles, variables);

    const defaultProps = {
        id: element.id,
        ["ms-id"]: mortarStudioID,
        ...element.attributes,
        onClick: handleClick,
        onContextMenu: handleClick,
        className: cn(`${tailwindClassList.join(" ")}`, element.attributes?.className)
    }

    if (voidElements.has(Tag)) {
        return (
            <EachElementMenu>
                <Tag
                    {...defaultProps}
                />
            </EachElementMenu>
        );
    }

    return (
        <EachElementMenu>
            <Tag
                {...defaultProps}
            >
                {element.textContent}
                {element.children.map((child) =>
                    typeof child === "string" ? null : (
                        <ElementRenderer
                            key={child.id}
                            element={child}
                            instance={instance}
                            component={component}
                            activeElements={activeElements}
                            components={components}
                            instances={instances}
                            variables={variables}
                        />
                    )
                )}
                {childInstances.map(childInstance => (
                    <InstanceRenderer
                        key={childInstance.id}
                        instance={childInstance}
                        activeElements={activeElements}
                        components={components}
                        instances={instances}
                        variables={variables}
                    />
                ))}
            </Tag>
        </EachElementMenu>
    );
}