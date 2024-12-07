import { useRightPanelContext } from "@/components/builder/context/right-panel.context";
import RightPanelContainer from "./RightPanelContainer";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useElement } from "@/components/builder/hooks/element.hook.tsx";
import { useState, useEffect } from "react";
import { usePreviewContext } from "@/components/builder/context/preview.context.tsx";
import { Input } from "@/components/ui/input.tsx";

export default function AttributesRightPanel() {
    const { state: { activePanel } } = useRightPanelContext();
    const { updateElementAttributes } = useElement();
    const { state: { activeElements } } = usePreviewContext();
    const [attributes, setAttributes] = useState(activeElements[0]?.attributes?.class || "");
    const [src, setSrc] = useState(activeElements[0]?.attributes?.src || "");

    useEffect(() => {
        if (activeElements[0]) {
            setAttributes(activeElements[0].attributes.class || "");
            if (activeElements[0].htmlTag === 'img') {
                setSrc(activeElements[0].attributes.src || "");
            }
        }
    }, [activeElements]);

    const handleAttributesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAttributes(e.target.value);
        updateElementAttributes({ class: e.target.value });
    };

    const handleSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSrc(e.target.value);
        updateElementAttributes({ src: e.target.value });
    };

    return (
        <RightPanelContainer show={activePanel === 'attributes'}>
            <header className={'border-b h-header'}>
                Attribute editor
            </header>
            <div className={'p-sm'}>
                <Textarea
                    placeholder={'Enter class names'}
                    value={attributes}
                    onChange={handleAttributesChange}
                />
                {activeElements[0]?.htmlTag === 'img' && (
                    <Input
                        placeholder={'Enter src'}
                        value={src}
                        onChange={handleSrcChange}
                    />
                )}
            </div>
        </RightPanelContainer>
    );
}