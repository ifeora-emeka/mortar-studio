// DesignerPreview.tsx
import {useState, useRef} from 'react';
import Frame from 'react-frame-component';
import DesignerToolBar
    from "@/components/builder/designer/components/DesignerToolBar/DesignerToolBar.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import InstanceRenderer
    from "@/components/builder/designer/components/Renderers/InstanceRenderer.tsx";
import {compileInstances} from "@repo/common/utils";
import ElementSelector from "@/components/builder/designer/layout/ElementSelector.tsx";
import ComponentSelector
    from "@/components/builder/designer/layout/ComponentSelector.tsx";

export default function DesignerPreview() {
    const {state: {activePage, instances}, setPreviewState} = usePreviewContext();
    const [width] = useState('w-[90%]');
    const frameRef = useRef<HTMLIFrameElement>(null);
    const instancesByPageID = activePage ? instances.filter(i => i.page_id === activePage.id) : [];

    return (
        <div
            className={'min-h-[--body-height] max-h-[--body-height] bg-background flex-1 flex justify-center'} onClick={() => setPreviewState({activeElement: null})}>
            {
                activePage && <div
                    id={'resizable-browser-window'}
                    className={`relative min-h-[--body-height] max-h-[--body-height] ${width} flex flex-col shadow-md`}
                >
                    <header
                        className={'min-h-[--header-height-sm] bg-card border rounded-tl-lg rounded-tr-lg flex items-center justify-between px-default'}>
                        <h1 className={'text-lg text-muted-foreground'}>{activePage.title}</h1>
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
                    <body class={"min-h-screen select-none"}>
                        <div id="frame-root"></div>
                    </body>
                    </html>
                `}
                        mountTarget="#frame-root"
                    >
                        <>
                            {
                                compileInstances(instancesByPageID).map(instance => {
                                    return <InstanceRenderer
                                        key={instance.id}
                                        instance={instance}
                                    />
                                })

                            }
                        </>
                        <ElementSelector/>
                        <ComponentSelector/>
                    </Frame>

                    <DesignerToolBar/>
                </div>
            }
        </div>
    );
}