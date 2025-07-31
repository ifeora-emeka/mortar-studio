import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion.tsx"
import StylePropertyContainer
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/StylePropertyContainer.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {useEffect, useState} from "react";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";
import TextContentProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/ElementSettings/TextContentProperty.tsx";

export default function ElementSettings() {
    const {state: {activeElements}} = usePreviewContext();
    const {updateElement} = useElement()
    const [textContent, setTextContent] = useState(activeElements[0]?.textContent || null);

    useEffect(() => {
        if (activeElements[0]) {
            setTextContent(activeElements[0].textContent || null);
        }
    }, [activeElements]);


    const handleTextContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextContent(e.target.value);
    };

    const handleTextContentBlur = () => {
        updateElement({textContent});
    };

    const handleTextContentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateElement({textContent});
        }
    };

    if (activeElements.length === 0) return null;

    return <>
        <AccordionItem value="element-settings">
            <AccordionTrigger>
                Element settings
            </AccordionTrigger>
            <AccordionContent>
                <div className={'flex flex-col gap-default'}>
                    {
                        !activeElements[0].textContent || activeElements[0].textContent !== null &&
                        <StylePropertyContainer label={'Text content'}>
                            <Textarea
                                rows={5}
                                className={'bg-background hover:bg-accent text-muted-foreground hover:text-foreground border-input'}
                                placeholder={'Enter text content or link a value'}
                                value={textContent || ''}
                                onChange={handleTextContentChange}
                                onBlur={handleTextContentBlur}
                                onKeyDown={handleTextContentKeyDown}
                            />
                        </StylePropertyContainer>
                    }

                </div>
                <TextContentProperty />
            </AccordionContent>
        </AccordionItem>
    </>
}