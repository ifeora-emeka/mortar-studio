import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import StylePropertyContainer
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/StylePropertyContainer.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Input} from "@/components/ui/input.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {useEffect, useState} from "react";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";

export default function ElementSettings() {
    const {state: {activeElements}} = usePreviewContext();
    const {updateElement} = useElement()
    const [textContent, setTextContent] = useState(activeElements[0]?.textContent || null);
    const [linkSource, setLinkSource] = useState(activeElements[0]?.attributes?.src || '');

    useEffect(() => {
        if (activeElements[0]) {
            setTextContent(activeElements[0].textContent || null);
            setLinkSource(activeElements[0].attributes?.src || '');
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

    const handleLinkSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLinkSource(e.target.value);
    };

    const handleLinkSourceBlur = () => {
        updateElement({
            attributes: {
                ...activeElements[0].attributes,
                src: linkSource
            }
        });
    };

    const handleLinkSourceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateElement({
                attributes: {
                    ...activeElements[0].attributes,
                    src: linkSource
                }
            });
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
                                placeholder={'Enter text content or link a value'}
                                value={textContent || ''}
                                onChange={handleTextContentChange}
                                onBlur={handleTextContentBlur}
                                onKeyDown={handleTextContentKeyDown}
                            />
                        </StylePropertyContainer>
                    }
                    <StylePropertyContainer label={'Link source'}>
                        <Input
                            placeholder={'Ex. https://www.example.com'}
                            value={linkSource}
                            onChange={handleLinkSourceChange}
                            onBlur={handleLinkSourceBlur}
                            onKeyDown={handleLinkSourceKeyDown}
                        />
                    </StylePropertyContainer>
                </div>
            </AccordionContent>
        </AccordionItem>
    </>
}