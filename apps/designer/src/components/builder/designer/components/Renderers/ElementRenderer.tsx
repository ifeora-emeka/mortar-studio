import { MortarElement } from "@repo/common/schema/element";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";

export default function ElementRenderer({ element }: { element: MortarElement }) {
    const { setPreviewState } = usePreviewContext();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreviewState({ activeElement: element });
        const iframeWindow = window.top!;
        iframeWindow.postMessage({ type: "selectElement", id: element.id }, "*");
    };

    return (
        <div
            id={element.id}
            {...element.attributes}
            onClick={handleClick}
            style={{ position: "relative" }}
        >
            {element.customProps.children}
            {element.children.map((child) =>
                typeof child === "string" ? null : (
                    <ElementRenderer key={child.id} element={child} />
                )
            )}
        </div>
    );
}
