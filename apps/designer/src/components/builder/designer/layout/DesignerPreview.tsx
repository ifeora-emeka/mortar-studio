// DesignerPreview.tsx
import React, { useState, useRef } from 'react';
import Frame from 'react-frame-component';
import { v4 as uuidv4 } from 'uuid';
import ElementBoundingBox from '@/components/builder/designer/components/ElementBoundingBox.tsx';
import { useDesignerContext } from '@/__mock__/TestDesginerContext.tsx';
import {Button} from "@/components/ui/button.tsx";

export default function DesignerPreview() {
    const { dispatch, state: { elements, activeElementID } } = useDesignerContext();
    const [width, setWith] = useState('w-[90%]');
    const [mode, setMode] = useState('light');
    const frameRef = useRef<HTMLIFrameElement>(null);

    const addElement = (htmlTag: string, textContent: string | null = null) => {
        const newElement = {
            id: uuidv4(),
            htmlTag,
            textContent,
            className: '',
            attributes: {},
        };
        dispatch({ type: 'ADD_ELEMENT', payload: newElement });
    };

    const selectElement = (id: string) => {
        dispatch({ type: 'SET_DESIGNER_STATE', payload: { activeElementID: id } });
    };

    const setActiveElementID = (id: string | null) => {
        dispatch({ type: 'SET_DESIGNER_STATE', payload: { activeElementID: id } });
    };

    return (
        <div className={'min-h-[--body-height] max-h-[--body-height] bg-background flex-1 flex justify-center'}>
            <div id={'resizable-browser-window'} className={`relative min-h-[--body-height] max-h-[--body-height] ${width} flex flex-col shadow-md`}>
                <header className={'min-h-[--header-height-sm] bg-card border rounded-tl-lg rounded-tr-lg flex items-center justify-between px-default'}>

                </header>
                <Frame
                    ref={frameRef}
                    className={'bg-white border-l border-r flex-1 max-h-[calc(100vh-var(--header-height)-var(--header-height-sm))]'}
                    initialContent={`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src="https://cdn.tailwindcss.com"></script>
                        <script>
                            tailwind.config = {
                            darkMode: 'class',
                                theme: {
                                    extend: {
                                        colors: {
                                            my_color: '#da373d',
                                        }
                                    }
                                }
                            }
                        </script>
                    </head>
                    <body class={"h-screen bg-white dark:bg-slate-600 p-10"}>
                        <div id="frame-root"></div>
                    </body>
                    </html>
                `}
                    mountTarget="#frame-root"
                >
                    <div className={`${mode} bg-white dark:bg-slate-700`}>
                        <Button variant={'secondary'} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>Toggle Mode</Button>
                        {elements.map((el) => {
                            return React.createElement(
                                el.htmlTag,
                                {
                                    key: el.id,
                                    id: el.id,
                                    className: el.className,
                                    ...el.attributes,
                                    onClick: () => selectElement(el.id),
                                },
                                el.textContent
                            );
                        })}
                    </div>
                </Frame>
                <div className={'flex gap-default z-50 bg-card shadow-xl border rounded-lg p-default fixed bottom-default left-1/2 transform -translate-x-1/2'}>
                    <Button variant={'secondary'} onClick={() => addElement('p', 'Text')}>Text</Button>
                    <Button variant={'secondary'} onClick={() => addElement('div')}>Div</Button>
                    <Button variant={'secondary'} onClick={() => addElement('img')}>Image</Button>
                </div>
                {activeElementID && (
                    <ElementBoundingBox activeElementID={activeElementID} frameRef={frameRef} setActiveElementID={setActiveElementID} />
                )}
            </div>
        </div>
    );
}