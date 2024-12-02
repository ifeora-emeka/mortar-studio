import Frame from 'react-frame-component';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {Computer, Moon, Phone, Sun, Tablet} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useDesignerContext} from "@/__mock__/TestDesginerContext.tsx";
import {v4 as uuidv4} from 'uuid';
import React from "react";

export default function DesignerPreview() {
    const {dispatch, state: {elements}} = useDesignerContext();
    const [width, setWith] = React.useState('w-[90%]');
    const [mode, setMode] = React.useState('light');

    const addElement = (htmlTag: string, textContent: string | null = null) => {
        const newElement = {
            id: uuidv4(),
            htmlTag,
            textContent,
            className: '',
            attributes: {},
        };
        dispatch({type: 'ADD_ELEMENT', payload: newElement});
    };

    const selectElement = (id: string) => {
        dispatch({type: 'SET_DESIGNER_STATE', payload: {activeElementID: id}});
    };

    return (
        <div
            className={'min-h-[--body-height] max-h-[--body-height] bg-background flex-1 flex justify-center'}>
            <div id={'resizable-browser-window'}
                 className={`relative min-h-[--body-height] max-h-[--body-height] ${width} flex flex-col`}>
                <header
                    className={'min-h-[--header-height-sm] bg-card border rounded-tl-lg rounded-tr-lg flex items-center justify-between px-default'}>
                    <div className={'w-[30%]'}>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href="/components">Components</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className={'w-[30%]'}>
                        <Input className={'size-2/3'}/>
                    </div>
                    <div className={'w-[30%] flex justify-end'}>
                        <ToggleGroup type="single">
                            <ToggleGroupItem size={'sm'} value="light"
                                             aria-label="Toggle bold" onClick={() => setWith('w-[40%]')}>
                                <Phone className="h-4 w-4"/>
                            </ToggleGroupItem>
                            <ToggleGroupItem size={'sm'} value="dark"
                                             aria-label="Toggle italic" onClick={() => setWith('w-[60%]')}>
                                <Tablet className="h-4 w-4"/>
                            </ToggleGroupItem>
                            <ToggleGroupItem size={'sm'} value="dark"
                                             aria-label="Toggle italic" onClick={() => setWith('w-[95%]')}>
                                <Computer className="h-4 w-4"/>
                            </ToggleGroupItem>
                        </ToggleGroup>
                        <ToggleGroup type="single">
                            <ToggleGroupItem size={'sm'} value="light"
                                             aria-label="Toggle bold" onClick={() => setMode('light')}>
                                <Sun className="h-4 w-4"/>
                            </ToggleGroupItem>
                            <ToggleGroupItem size={'sm'} value="dark"
                                             aria-label="Toggle italic" onClick={() => setMode('dark')}>
                                <Moon className="h-4 w-4"/>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </header>
                <Frame
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
                    <body class={"h-screen bg-white p-10"}>
                        <div id="frame-root"></div>
                    </body> 
                    </html>
                `}
                    mountTarget="#frame-root"
                >
                    <div className={`${mode}`}>
                    {
                        elements.map((el) => {
                            return React.createElement(
                                el.htmlTag,
                                {
                                    key: el.id,
                                    className: el.className,
                                    ...el.attributes,
                                    onClick: () => selectElement(el.id),
                                },
                                el.textContent
                            );
                        })
                    }

                    </div>
                </Frame>
                <div
                    className={'flex gap-default z-50 bg-card shadow-xl border rounded-lg p-default fixed bottom-default left-1/2 transform -translate-x-1/2'}>
                    <Button variant={'secondary'} onClick={() => addElement('p', 'Text')}>
                        Text
                    </Button>
                    <Button variant={'secondary'} onClick={() => addElement('div')}>
                        Div
                    </Button>
                    <Button variant={'secondary'} onClick={() => addElement('img')}>
                        Image
                    </Button>
                </div>
            </div>
        </div>
    );
}