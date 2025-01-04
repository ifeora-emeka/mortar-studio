import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {MortarElement} from "@repo/common/schema/element";
import {v4 as uuidv4} from 'uuid';
import {
    defaultStaticElements
} from "@/components/builder/static-elements/index.static.ts";
import {MortarElementInstance} from "@repo/common/schema/instance";
import {MortarComponent} from "@repo/common/schema/component";


export const useElement = () => {
    const {state, setPreviewState} = usePreviewContext();

    const getActiveComponent = () => {
        const {activeElements, components} = state;
        if (activeElements.length === 0) return null;

        const activeElement = activeElements[0];
        return components.find(component =>
            component.elements.some(element => element.id === activeElement.id)
        );
    };

    const updateElementTailwindStyles = (style: Record<string, string>) => {
        console.log('updateElementTailwindStyles:::', style);
        const { activeElements, components, activeBreakpoint, activeState } = state;

        const activeElement = activeElements[0];
        if (!activeElement) return;

        const activeComponent = components.find(component =>
            component.elements.some(element => element.id === activeElement.id)
        );
        if (!activeComponent) return;

        const updatedElement = {
            ...activeElement,
            tailwindStyles: {
                ...activeElement.tailwindStyles,
                [activeBreakpoint]: {
                    ...activeElement.tailwindStyles[activeBreakpoint],
                    [activeState]: {
                        ...activeElement.tailwindStyles[activeBreakpoint]?.[activeState],
                        ...style
                    }
                }
            }
        };

        const updatedComponent = {
            ...activeComponent,
            elements: activeComponent.elements.map(el => el.id === activeElement.id ? updatedElement : el)
        };

        setPreviewState({
            components: components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [updatedElement]
        });
    };

    const appendElement = (elementData: Partial<MortarElement>) => {
        const {components: allComponents} = state;
        const activeComponent = getActiveComponent();
        const activeElement = state.activeElements[0];
        if (!activeComponent || !activeElement) return;

        const components = allComponents;
        const activeComponentIndex = components.findIndex(comp => comp.id == activeComponent.id);

        const newElement: MortarElement = {
            ...defaultStaticElements,
            ...elementData,
            id: uuidv4(),
            parent_element_id: activeElement.id,
            index: activeElement.children.length,
            children: elementData.children || [],
        };

        activeComponent.elements = [
            ...activeComponent.elements,
            newElement,
        ];

        components[activeComponentIndex] = activeComponent;

        setPreviewState({components});
    };

    const prependElement = () => {

    };

    const duplicateElement = () => {
        const { activeElements, activeComponents, components: allComponents } = state;

        if (activeElements.length === 0) return;

        const activeElement = activeElements[0];
        const activeComponent = activeComponents[0];
        if (!activeComponent || !activeElement.parent_element_id) return;

        const newElements: MortarElement[] = [];

        const duplicateElementWithChildren = (element: MortarElement, newParentId: string | null, newIndex: number): MortarElement => {
            const newElementId = uuidv4();
            const newElement: MortarElement = {
                ...element,
                id: newElementId,
                parent_element_id: newParentId,
                index: newIndex,
                children: element.children.map((child, idx) => duplicateElementWithChildren(child, newElementId, idx))
            };
            newElements.push(newElement);
            return newElement;
        };

        const parentElement = activeComponent.elements.find(el => el.id === activeElement.parent_element_id);
        if (!parentElement) return;

        const siblings = activeComponent.elements.filter(el => el.parent_element_id === parentElement.id).sort((a, b) => a.index - b.index);
        siblings.forEach((sibling) => {
            if (sibling.index > activeElement.index) {
                sibling.index += 1;
            }
        });

        const newParentIndex = activeElement.index + 1;
        duplicateElementWithChildren(activeElement, activeElement.parent_element_id, newParentIndex);

        const updatedComponent = {
            ...activeComponent,
            elements: [
                ...activeComponent.elements,
                ...newElements
            ]
        };

        setPreviewState({
            components: allComponents.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
        });

        setTimeout(() => {
            setPreviewState({
                activeElements: [newElements[0]]
            });
        }, 0);
    };


    const deleteElement = () => {
        const { activeElements, activeComponents, components: allComponents } = state;

        if (activeElements.length === 0) return;

        const activeElement = activeElements[0];
        const activeComponent = activeComponents[0];
        if (!activeComponent) return;

        const deleteElementWithChildren = (element: MortarElement, elements: MortarElement[]): MortarElement[] => {
            return elements.filter(el => el.id !== element.id && el.parent_element_id !== element.id)
                .map(el => ({
                    ...el,
                    children: deleteElementWithChildren(el, el.children)
                }));
        };

        const updatedElements = deleteElementWithChildren(activeElement, activeComponent.elements);

        const parentElement = activeComponent.elements.find(el => el.id === activeElement.parent_element_id);
        if (parentElement) {
            const siblings = updatedElements.filter(el => el.parent_element_id === parentElement.id).sort((a, b) => a.index - b.index);
            siblings.forEach((sibling, idx) => {
                sibling.index = idx;
            });
        }

        const updatedComponent = {
            ...activeComponent,
            elements: updatedElements,
        };

        setPreviewState({
            components: allComponents.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [],
        });
    };

    const incrementElementIndex = () => {
        const { activeElements, activeComponents, components: allComponents } = state;

        if (activeElements.length === 0) return;

        const activeElement = activeElements[0];
        const activeComponent = activeComponents[0];
        if (!activeComponent || !activeElement.parent_element_id) return;

        const parentElement = activeComponent.elements.find(el => el.id === activeElement.parent_element_id);
        if (!parentElement) return;

        const siblings = activeComponent.elements.filter(el => el.parent_element_id === parentElement.id).sort((a, b) => a.index - b.index);

        const currentIndex = siblings.findIndex(el => el.id === activeElement.id);
        if (currentIndex === -1 || currentIndex === siblings.length - 1) return;

        const nextElement = siblings[currentIndex + 1];
        const tempIndex = activeElement.index;
        activeElement.index = nextElement.index;
        nextElement.index = tempIndex;

        siblings.sort((a, b) => a.index - b.index).forEach((sibling, idx) => {
            sibling.index = idx;
        });

        const updatedComponent = {
            ...activeComponent,
            elements: activeComponent.elements.map(el => {
                const sibling = siblings.find(sib => sib.id === el.id);
                return sibling ? sibling : el;
            })
        };

        setPreviewState({
            components: allComponents.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [activeElement]
        });
    };

    const decrementElementIndex = () => {
        const { activeElements, activeComponents, components: allComponents } = state;

        if (activeElements.length === 0) return;

        const activeElement = activeElements[0];
        const activeComponent = activeComponents[0];
        if (!activeComponent || !activeElement.parent_element_id) return;

        const parentElement = activeComponent.elements.find(el => el.id === activeElement.parent_element_id);
        if (!parentElement) return;

        const siblings = activeComponent.elements.filter(el => el.parent_element_id === parentElement.id).sort((a, b) => a.index - b.index);

        const currentIndex = siblings.findIndex(el => el.id === activeElement.id);
        if (currentIndex === -1 || currentIndex === 0) return;

        const prevElement = siblings[currentIndex - 1];
        const tempIndex = activeElement.index;
        activeElement.index = prevElement.index;
        prevElement.index = tempIndex;

        siblings.sort((a, b) => a.index - b.index).forEach((sibling, idx) => {
            sibling.index = idx;
        });

        const updatedComponent = {
            ...activeComponent,
            elements: activeComponent.elements.map(el => {
                const sibling = siblings.find(sib => sib.id === el.id);
                return sibling ? sibling : el;
            })
        };

        setPreviewState({
            components: allComponents.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [activeElement]
        });
    };

    const updateElementAttributes = (attributes: Record<string, string>) => {
        const {activeElements, components} = state;

        const activeElement = activeElements[0];
        if (!activeElement) return;

        const activeComponent = components.find(component =>
            component.elements.some(element => element.id === activeElement.id)
        );
        if (!activeComponent) return;

        const updatedElement = {
            ...activeElement,
            attributes: {
                ...activeElement.attributes,
                ...attributes
            }
        };

        const updatedComponent = {
            ...activeComponent,
            elements: activeComponent.elements.map(el => el.id === activeElement.id ? updatedElement : el)
        };

        setPreviewState({
            components: components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [updatedElement]
        });
    };

    const setActiveElement = ({element, instance, component}: {
        element: MortarElement;
        instance: MortarElementInstance;
        component: MortarComponent;
    }) => {
        setPreviewState({
            activeElements: [element],
            activePageInstances: [instance],
            activeComponents: [component]
        });
    };

    const updateElement = (updatedData: Partial<MortarElement>) => {
        const {activeElements, components} = state;

        const activeElement = activeElements[0];
        if (!activeElement) return;

        const activeComponent = components.find(component =>
            component.elements.some(element => element.id === activeElement.id)
        );
        if (!activeComponent) return;

        const updatedElement = {
            ...activeElement,
            ...updatedData
        };

        const updatedComponent = {
            ...activeComponent,
            elements: activeComponent.elements.map(el => el.id === activeElement.id ? updatedElement : el)
        };

        setPreviewState({
            components: components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [updatedElement]
        });
    };

    const copyActiveElement = () => {
        const { activeElements, activeComponents } = state;

        if (activeElements.length === 0) return;

        const activeElement = activeElements[0];
        const activeComponent = activeComponents[0];
        if (!activeComponent || !activeElement) return;

        const duplicateElementWithChildren = (element: MortarElement): MortarElement => {
            const newElement: MortarElement = {
                ...element,
                id: uuidv4(),
                parent_element_id: element.parent_element_id,
                children: element.children.map(child => duplicateElementWithChildren(child))
            };
            return newElement;
        };

        const elementToCopy = duplicateElementWithChildren(activeElement);

        sessionStorage.setItem('copiedElement', JSON.stringify(elementToCopy));
    };

    const pasteElement = () => {
        const { activeElements, activeComponents, components: allComponents } = state;

        if (activeElements.length === 0) return;

        const activeElement = activeElements[0];
        const activeComponent = activeComponents[0];
        if (!activeComponent || !activeElement) return;

        const copiedElementStr = sessionStorage.getItem('copiedElement');
        if (!copiedElementStr) return;

        const elementToPaste: MortarElement = JSON.parse(copiedElementStr);

        const newElements: MortarElement[] = [];

        const duplicateElementWithChildren = (element: MortarElement, newParentId: string | null, newIndex: number): MortarElement => {
            const newElementId = uuidv4();
            const newElement: MortarElement = {
                ...element,
                id: newElementId,
                parent_element_id: newParentId,
                index: newIndex,
                children: []
            };
            newElements.push(newElement);

            element.children.forEach((child, idx) => {
                duplicateElementWithChildren(child, newElementId, idx);
            });

            return newElement;
        };

        const lastIndex = activeComponent.elements
            .filter(el => el.parent_element_id === activeElement.id)
            .reduce((maxIndex, el) => Math.max(maxIndex, el.index), -1);

        duplicateElementWithChildren(elementToPaste, activeElement.id, lastIndex + 1);

        const updatedComponent = {
            ...activeComponent,
            elements: [
                ...activeComponent.elements,
                ...newElements
            ]
        };

        setPreviewState({
            components: allComponents.map(comp =>
                comp.id === activeComponent.id ? updatedComponent : comp
            ),
            activeElements: [newElements[0]]
        });
    };

    const cutActiveElement = () => {
        const { activeElements, activeComponents, components: allComponents } = state;

        if (activeElements.length === 0) return;

        const activeElement = activeElements[0];
        const activeComponent = activeComponents[0];
        if (!activeComponent || !activeElement || !activeElement.parent_element_id) return;

        // Copy the active element to session storage
        const elementToCut: MortarElement = {
            ...activeElement,
            children: activeElement.children.map(child => ({...child}))
        };
        sessionStorage.setItem('copiedElement', JSON.stringify(elementToCut));

        // Delete the active element
        const deleteElementWithChildren = (element: MortarElement, elements: MortarElement[]): MortarElement[] => {
            return elements.filter(el => el.id !== element.id && el.parent_element_id !== element.id)
                .map(el => ({
                    ...el,
                    children: deleteElementWithChildren(el, el.children)
                }));
        };

        const updatedElements = deleteElementWithChildren(activeElement, activeComponent.elements);

        const parentElement = activeComponent.elements.find(el => el.id === activeElement.parent_element_id);
        if (parentElement) {
            const siblings = updatedElements.filter(el => el.parent_element_id === parentElement.id).sort((a, b) => a.index - b.index);
            siblings.forEach((sibling, idx) => {
                sibling.index = idx;
            });
        }

        const updatedComponent = {
            ...activeComponent,
            elements: updatedElements,
        };

        setPreviewState({
            components: allComponents.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [],
        });
    };

    const setElementAsActive = (element: MortarElement | null) => {
        const { instances, components } = state;

        if (!element) {
            setPreviewState({
                activeElements: [],
                activeComponents: [],
                activePageInstances: []
            });
            return;
        }


        const component = components.find(comp => comp.elements.some(el => el.id === element.id));
        const instance = instances.find(ins => ins.ref === `ref::component::${component?.id}`);

        if (instance && component) {
            setPreviewState({
                activeElements: [element],
                activeComponents: [component],
                activePageInstances: [instance]
            });
        }
    };

    return {
        appendElement,
        prependElement,
        duplicateElement,
        deleteElement,
        incrementElementIndex,
        decrementElementIndex,
        updateElementAttributes,
        updateElement,
        copyActiveElement,
        pasteElement,
        cutActiveElement,
        setElementAsActive,
        setActiveElement,
        updateElementTailwindStyles
    };
};