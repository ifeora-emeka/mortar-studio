import {MortarElement} from "@repo/common/schema/element";
import {MortarElementInstance} from "@repo/common/schema/instance";
import {MortarComponent} from "@repo/common/schema/component";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";

const voidElements = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"
]);

export default function ElementRenderer({element, instance, component}: {
    element: MortarElement;
    instance: MortarElementInstance;
    component: MortarComponent;
}) {
    const {setActiveElement} = useElement();
    const mortarStudioID = `ref::${instance.id}::${component.id}::${element.id}`;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveElement({element, component, instance});
    };

    const Tag = element.htmlTag as keyof JSX.IntrinsicElements;

    if (voidElements.has(Tag)) {
        return (
            <Tag
                id={element.id}
                ms-id={mortarStudioID}
                {...element.attributes}
                onClick={handleClick}
            />
        );
    }

    return (
        <Tag
            id={element.id}
            ms-id={mortarStudioID}
            {...element.attributes}
            onClick={handleClick}
        >
            {element.textContent}
            {element.children.map((child) =>
                typeof child === "string" ? null : (
                    <ElementRenderer
                        key={child.id}
                        element={child}
                        instance={instance}
                        component={component}
                    />
                )
            )}
        </Tag>
    );
}