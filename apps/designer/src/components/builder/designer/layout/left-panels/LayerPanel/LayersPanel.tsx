import LeftPanelContainer
    from "@/components/builder/designer/layout/left-panels/LeftPanelContainer.tsx";
import {useLeftPanelContext} from "@/components/builder/context/left-panel.context.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {ComponentIcon, Ellipsis, File, Heading} from "lucide-react";
import {MortarElement} from "@repo/common/schema/element";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";


export default function LayersPanel() {
    const {state: {activePanel}} = useLeftPanelContext();
    const {state: {instances, activePage, components}} = usePreviewContext();

    if (!activePage) return null;

    return <>
        <LeftPanelContainer show={activePanel == 'layers'}>
            <div className={'p-sm flex flex-col gap-sm'}>
                {
                    instances.filter(ins => ins.page_id === activePage.id).map((instance) => {
                        const component = components.find(com => com.id == instance.ref.split('::')[2]);
                        const rootElement = component ? component.elements.find(el => el.parent_element_id === null) : null;
                        if (rootElement && component) {
                            return <div className={cn({
                                "border-l": component.elements.filter(el => el.parent_element_id !== null).length > 0
                            })} key={rootElement.id}>
                                <EachElement
                                    element={rootElement}
                                    name={`${rootElement.htmlTag} - ${component.name}`}
                                    iconType={'component'}
                                    elements={component.elements.filter(el => el.parent_element_id !== null)}
                                />
                            </div>
                        }
                    })
                }
            </div>
        </LeftPanelContainer>
    </>
}

const EachElement = ({name, iconType, elements, element}: {
    name: string,
    iconType: 'component' | 'default' | 'heading';
    elements: MortarElement[]
    element: MortarElement;
}) => {
    const [showChildren, setShowChildren] = useState(true);
    const {setElementAsActive} = useElement();
    const {state: {activeElements, instances, components}} = usePreviewContext();
    const isActive = activeElements[0] && activeElements[0].id === element.id

    const handleClick = () => {
        setElementAsActive(element);
        // setShowChildren(!showChildren);
    }

    return (
        <>
            <div
                className={cn('-sm flex gap-sm items-center justify-between group hover:bg-accent py-1 px-2 rounded-lg mb-sm', {
                    "bg-primary/50 text-primary-foreground hover:bg-primary/60": isActive
                })} onClick={handleClick}>
                <div className={'truncate flex items-center gap-sm'}>
                    <div>
                        {
                            iconType === 'component' && <ComponentIcon className={'h-4 w-4'}/>
                        }
                        {
                            iconType === 'default' && <File className={'h-4 w-4'}/>
                        }
                        {
                            iconType === 'heading' && <Heading className={'h-4 w-4'}/>
                        }
                    </div>
                    <div className={'truncate max-w-[230px]'}>
                        <small className={'truncate'}>{name}</small>
                    </div>
                </div>
                <button className={'text-muted-foreground opacity-0 group-hover:opacity-100'}>
                    <Ellipsis className={'w-4 h-4'}/>
                </button>
            </div>

            {
                showChildren && <div className={'pl-4 border-l'}>
                    {
                        elements.filter(el => el.parent_element_id == element.id).map((el) => {
                            return <div key={el.id}>
                                <EachElement
                                    name={`${el.htmlTag} - ${el.name}`}
                                    elements={el.children}
                                    iconType={'default'}
                                    element={el}
                                />
                                {instances.filter(ins => ins.parentElement === el.id).map(ins => {
                                    console.log('FOUND INSTANCE:::', ins)
                                    const component = components.find(com => com.id == ins.ref.split('::')[2]);
                                    const rootElement = component ? component.elements.find(el => el.parent_element_id === null) : null;
                                    if (rootElement && component) {
                                        return <div className={cn({
                                            "border-l": component.elements.filter(el => el.parent_element_id !== null).length > 0
                                        })} key={rootElement.id}>
                                            <EachElement
                                                element={rootElement}
                                                name={`${rootElement.htmlTag} - ${component.name}`}
                                                iconType={'component'}
                                                elements={component.elements.filter(el => el.parent_element_id !== null)}
                                            />
                                        </div>
                                    }
                                })}
                            </div>
                        })
                    }
                </div>
            }
        </>
    );
}
