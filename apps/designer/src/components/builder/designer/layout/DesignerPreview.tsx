// DesignerPreview.tsx
import {useState, useRef} from 'react';
import Frame from 'react-frame-component';
import {Button} from "@/components/ui/button.tsx";

export default function DesignerPreview() {
    const [width] = useState('w-[90%]');
    const [mode, setMode] = useState('light');
    const frameRef = useRef<HTMLIFrameElement>(null);

    return (
        <div
            className={'min-h-[--body-height] max-h-[--body-height] bg-background flex-1 flex justify-center'}>
            <div id={'resizable-browser-window'}
                 className={`relative min-h-[--body-height] max-h-[--body-height] ${width} flex flex-col shadow-md`}>
                <header
                    className={'min-h-[--header-height-sm] bg-card border rounded-tl-lg rounded-tr-lg flex items-center justify-between px-default'}>

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
                        <Button variant={'secondary'}
                                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>Toggle
                            Mode</Button>
                    </div>
                </Frame>
                <div
                    className={'flex gap-default z-50 bg-card shadow-xl border rounded-lg p-default fixed bottom-default left-1/2 transform -translate-x-1/2'}>
                    <Button variant={'secondary'} onClick={() => {
                    }}>Text</Button>
                    <Button variant={'secondary'} onClick={() => {
                    }}>Div</Button>
                    <Button variant={'secondary'} onClick={() => {
                    }}>Image</Button>
                </div>
                {/*{activeElementID && (*/}
                {/*    <ElementBoundingBox*/}
                {/*        activeElementID={activeElementID}*/}
                {/*        frameRef={frameRef}*/}
                {/*        setActiveElementID={setActiveElementID}*/}
                {/*    />*/}
                {/*)}*/}
            </div>
        </div>
    );
}