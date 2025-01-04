import {useRef, useEffect} from 'react';
import Frame from 'react-frame-component';
import DesignerToolBar from "@/components/builder/designer/components/DesignerToolBar/DesignerToolBar.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import InstanceRenderer from "@/components/builder/designer/components/Renderers/InstanceRenderer.tsx";
import {compileInstances} from "@repo/common/utils";
import { MortarElement } from "@repo/common/schema/element";
import DesignerPreviewHeader
    from "@/components/builder/designer/layout/DesignerPreview/DesignerPreviewHeader.tsx";

export default function DesignerPreview() {
    const { state: { activePage, instances, activeElements, activePageInstances, activeComponents, components, activeBreakpoint, variables } } = usePreviewContext();
    const frameRef = useRef<HTMLIFrameElement>(null);
    const instancesByPageID = activePage ? instances.filter(i => i.page_id === activePage.id) : [];
    const width = activeBreakpoint === 'default' ? '400px' : activeBreakpoint === 'md' ? '600px' : activeBreakpoint === 'lg' ? '97%' : '100%';

    useEffect(() => {
        const handleResize = () => {
            if (frameRef.current) {
                const frameDoc = frameRef.current.contentDocument;
                if (frameDoc) {
                    const frameRoot = frameDoc.getElementById('frame-root');
                    if (frameRoot && activeElements.length > 0) {
                        const selectedElement = activeElements[0];
                        const mortarStudioID = `ref::${activePageInstances[0].id}::${activeComponents[0].id}::${selectedElement.id}`;
                        const selectedElementDom = frameDoc.querySelector(`[ms-id="${mortarStudioID}"]`);
                        if (selectedElementDom) {
                            updateBoundingBox(frameRoot, selectedElementDom as HTMLElement, frameDoc);
                            const parentElement = getParentElement(selectedElement);
                            if (parentElement) {
                                const parentMortarStudioID = `ref::${activePageInstances[0].id}::${activeComponents[0].id}::${parentElement.id}`;
                                const parentElementDom = frameDoc.querySelector(`[ms-id="${parentMortarStudioID}"]`);
                                if (parentElementDom) {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    updateParentBoundingBox(frameRoot, parentElementDom as HTMLElement, parentElement, frameDoc);
                                }
                            }
                        }
                    }
                }
            }
        };

        window.addEventListener('resize', handleResize);
        if (frameRef.current) {
            frameRef.current.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (frameRef.current) {
                frameRef.current.removeEventListener('resize', handleResize);
            }
        };
    }, [activeElements, activePageInstances, activeComponents]);

    useEffect(() => {
        if (frameRef.current) {
            const frameDoc = frameRef.current.contentDocument;
            if (frameDoc) {
                const frameRoot = frameDoc.getElementById('frame-root');
                if (frameRoot) {
                    const existingBoundingBoxes = frameRoot.querySelectorAll('.bounding-box, .bounding-box-tag, .parent-bounding-box, .parent-bounding-box-tag');
                    existingBoundingBoxes.forEach(box => box.remove());

                    if (activeElements.length > 0) {
                        const selectedElement = activeElements[0];
                        const mortarStudioID = `ref::${activePageInstances[0].id}::${activeComponents[0].id}::${selectedElement.id}`;
                        const selectedElementDom = frameDoc.querySelector(`[ms-id="${mortarStudioID}"]`);

                        if (selectedElementDom) {
                            createBoundingBox(frameRoot, selectedElementDom as HTMLElement, selectedElement, frameDoc);

                            const observer = new MutationObserver(() => {
                                updateBoundingBox(frameRoot, selectedElementDom as HTMLElement, frameDoc);
                            });
                            observer.observe(selectedElementDom, { attributes: true, childList: true, subtree: true });

                            const parentElement = getParentElement(selectedElement);
                            if (parentElement) {
                                const parentMortarStudioID = `ref::${activePageInstances[0].id}::${activeComponents[0].id}::${parentElement.id}`;
                                const parentElementDom = frameDoc.querySelector(`[ms-id="${parentMortarStudioID}"]`);
                                if (parentElementDom) {
                                    createParentBoundingBox(frameRoot, parentElementDom as HTMLElement, parentElement, frameDoc);

                                    const parentObserver = new MutationObserver(() => {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        updateParentBoundingBox(frameRoot, parentElementDom as HTMLElement, parentElement, frameDoc);
                                    });
                                    parentObserver.observe(parentElementDom, { attributes: true, childList: true, subtree: true });
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [activeElements, activePageInstances, activeComponents]);

    const getParentElement = (element: MortarElement) => {
        return activeComponents.flatMap(component => component.elements).find(el => el.id === element.parent_element_id) || null;
    };

    const createBoundingBox = (
        frameRoot: HTMLElement,
        selectedElement: HTMLElement,
        elementData: MortarElement,
        frameDoc: Document
    ) => {
        const boundingBox = document.createElement('div');
        boundingBox.className = 'bounding-box';

        const rect = selectedElement.getBoundingClientRect();

        const scrollTop = frameDoc.documentElement.scrollTop;
        const scrollLeft = frameDoc.documentElement.scrollLeft;
        const clientTop = frameDoc.documentElement.clientTop || 0;
        const clientLeft = frameDoc.documentElement.clientLeft || 0;

        boundingBox.style.position = 'absolute';
        boundingBox.style.top = `${rect.top + scrollTop - clientTop}px`;
        boundingBox.style.left = `${rect.left + scrollLeft - clientLeft}px`;
        boundingBox.style.width = `${rect.width}px`;
        boundingBox.style.height = `${rect.height}px`;
        boundingBox.style.border = '3px solid #4299E1';
        boundingBox.style.boxSizing = 'border-box';
        boundingBox.style.pointerEvents = 'none';
        boundingBox.style.zIndex = '9999';
        boundingBox.style.borderRadius = '4px';
        boundingBox.style.boxShadow = '0 0 0 2px rgba(66, 153, 225, 0.2)';

        const tagBadge = document.createElement('div');
        tagBadge.className = 'bounding-box-tag';
        tagBadge.style.position = 'absolute';
        tagBadge.style.top = '-24px';
        tagBadge.style.left = '0';
        tagBadge.style.backgroundColor = '#4299E1';
        tagBadge.style.color = 'white';
        tagBadge.style.padding = '2px 6px';
        tagBadge.style.borderRadius = '4px 4px 0 0';
        tagBadge.style.fontSize = '12px';
        tagBadge.style.fontFamily = 'system-ui, sans-serif';
        tagBadge.textContent = `${elementData.htmlTag} - index:${elementData.index}`;

        boundingBox.appendChild(tagBadge);
        frameRoot.appendChild(boundingBox);
    };

    const createParentBoundingBox = (
        frameRoot: HTMLElement,
        parentElement: HTMLElement,
        elementData: MortarElement,
        frameDoc: Document
    ) => {
        const boundingBox = document.createElement('div');
        boundingBox.className = 'parent-bounding-box';

        const rect = parentElement.getBoundingClientRect();

        const scrollTop = frameDoc.documentElement?.scrollTop;
        const scrollLeft = frameDoc.documentElement.scrollLeft;
        const clientTop = frameDoc.documentElement.clientTop || 0;
        const clientLeft = frameDoc.documentElement.clientLeft || 0;

        boundingBox.style.position = 'absolute';
        boundingBox.style.top = `${rect.top + scrollTop - clientTop}px`;
        boundingBox.style.left = `${rect.left + scrollLeft - clientLeft}px`;
        boundingBox.style.width = `${rect.width}px`;
        boundingBox.style.height = `${rect.height}px`;
        boundingBox.style.border = '2px dashed #FF5733';
        boundingBox.style.boxSizing = 'border-box';
        boundingBox.style.pointerEvents = 'none';
        boundingBox.style.zIndex = '9998';
        boundingBox.style.borderRadius = '4px';

        const tagBadge = document.createElement('div');
        tagBadge.className = 'parent-bounding-box-tag';
        tagBadge.style.position = 'absolute';
        tagBadge.style.top = '-24px';
        tagBadge.style.left = '0';
        tagBadge.style.backgroundColor = '#FF5733';
        tagBadge.style.color = 'white';
        tagBadge.style.padding = '2px 6px';
        tagBadge.style.borderRadius = '4px 4px 0 0';
        tagBadge.style.fontSize = '12px';
        tagBadge.style.fontFamily = 'system-ui, sans-serif';
        tagBadge.textContent = elementData.htmlTag;

        boundingBox.appendChild(tagBadge);
        frameRoot.appendChild(boundingBox);
    };

    const updateBoundingBox = (
        frameRoot: HTMLElement,
        selectedElement: HTMLElement,
        frameDoc: Document
    ) => {
        const boundingBox = frameRoot.querySelector('.bounding-box') as HTMLElement;
        if (boundingBox) {
            const rect = selectedElement.getBoundingClientRect();

            const scrollTop = frameDoc.documentElement?.scrollTop;
            const scrollLeft = frameDoc.documentElement.scrollLeft;
            const clientTop = frameDoc.documentElement.clientTop || 0;
            const clientLeft = frameDoc.documentElement.clientLeft || 0;

            boundingBox.style.top = `${rect.top + scrollTop - clientTop}px`;
            boundingBox.style.left = `${rect.left + scrollLeft - clientLeft}px`;
            boundingBox.style.width = `${rect.width}px`;
            boundingBox.style.height = `${rect.height}px`;
        }
    };

    const updateParentBoundingBox = (
        frameRoot: HTMLElement,
        parentElement: HTMLElement,
        frameDoc: Document
    ) => {
        const boundingBox = frameRoot.querySelector('.parent-bounding-box') as HTMLElement;
        if (boundingBox && frameDoc.documentElement) {
            const rect = parentElement.getBoundingClientRect();

            const scrollTop = frameDoc.documentElement?.scrollTop || 0;
            const scrollLeft = frameDoc.documentElement?.scrollLeft || 0;
            const clientTop = frameDoc.documentElement?.clientTop || 0;
            const clientLeft = frameDoc.documentElement?.clientLeft || 0;

            boundingBox.style.top = `${rect.top + scrollTop - clientTop}px`;
            boundingBox.style.left = `${rect.left + scrollLeft - clientLeft}px`;
            boundingBox.style.width = `${rect.width}px`;
            boundingBox.style.height = `${rect.height}px`;
        }
    };

    return (
        <div
            className={'min-h-[--body-height] max-h-[--body-height] bg-background flex-1 flex justify-center'}
        >
            {
                activePage && <div
                    style={{ width }}
                    id={'resizable-browser-window'}
                    className={`relative min-h-[--body-height] max-h-[--body-height] flex flex-col shadow-md`}
                >
                    <DesignerPreviewHeader />
                    <Frame
                        ref={frameRef}
                        className={'bg-white border-l border-r flex-1 max-h-[calc(100vh-var(--header-height)-var(--header-height-sm))]'}
                        initialContent={`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=1024, initial-scale=1.0">
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
            <style>
                .bounding-box {
                    transition: all 0.2s ease-in-out;
                }
                .bounding-box-tag {
                    transition: all 0.2s ease-in-out;
                }
                .parent-bounding-box {
                    transition: all 0.2s ease-in-out;
                }
                .parent-bounding-box-tag {
                    transition: all 0.2s ease-in-out;
                }
            </style>
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
                                compileInstances(instancesByPageID).sort((a, b) => a.index - b.index).map(instance => {
                                    return <InstanceRenderer
                                        key={instance.id}
                                        instance={instance}
                                        activeElements={activeElements}
                                        components={components}
                                        instances={instances}
                                        variables={variables}
                                    />
                                })
                            }
                        </>
                    </Frame>
                    <DesignerToolBar />
                </div>
            }
        </div>
    );
}