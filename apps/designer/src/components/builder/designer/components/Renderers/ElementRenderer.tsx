import { MortarElement } from "@repo/common/schema/element";
import { usePreviewContext } from "@/components/builder/context/preview.context.tsx";

const voidElements = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"
]);

export default function ElementRenderer({ element }: { element: MortarElement }) {
    const { setPreviewState } = usePreviewContext();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreviewState({ activeElements: [element] });
    };

    const Tag = element.htmlTag as keyof JSX.IntrinsicElements;

    if (voidElements.has(Tag)) {
        return (
            <Tag
                id={element.id}
                {...element.attributes}
                onClick={handleClick}
            />
        );
    }

    return (
        <Tag
            id={element.id}
            {...element.attributes}
            onClick={handleClick}
        >
            {element.customProps.children}
            {element.children.map((child) =>
                typeof child === "string" ? null : (
                    <ElementRenderer key={child.id} element={child} />
                )
            )}
        </Tag>
    );
}