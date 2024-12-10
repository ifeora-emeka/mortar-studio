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

    const appendElement = (elementData: Partial<MortarElement>) => {
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const activeElement = state.activeElements[0];
        const newElement: MortarElement = {
            ...defaultStaticElements,
            ...elementData,
            id: uuidv4(),
            parent_element_id: activeElement.id,
            index: activeElement.children.length,
            children: elementData.children || [],
        };

        const updatedElements = [...activeComponent.elements, newElement];

        const updatedComponent = {
            ...activeComponent,
            elements: updatedElements,
        };

        setPreviewState({
            components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [newElement]
        });
    };

    const prependElement = () => {

    };

    const duplicateElement = () => {

    };

    const deleteElement = () => {

    };

    const incrementElementIndex = () => {
        const {activeElements, activeComponents, components: allComponents} = state;

        if (activeElements.length === 0) return;

        const activeElement = activeElements[0];
        const activeComponent = activeComponents[0];
        if (!activeComponent) return;

        const components = allComponents;
        const activeComponentIndex = components.findIndex(comp => comp.id === activeComponent.id);
        const componentElements = components[activeComponentIndex].elements.sort((a, b) => a.index - b.index);
        const targetElementIndex = componentElements.findIndex(el => el.id === activeElement.id);

        if (targetElementIndex < componentElements.length - 1) {
            const nextElement = componentElements[targetElementIndex + 1];

            // Swap the indices
            const tempIndex = activeElement.index;
            activeElement.index = nextElement.index;
            nextElement.index = tempIndex;

            // Update the component elements
            componentElements[targetElementIndex] = nextElement;
            componentElements[targetElementIndex + 1] = activeElement;

            components[activeComponentIndex].elements = componentElements;

            setPreviewState({components, activeElements})
        }
    };

    const decrementElementIndex = () => {
        const {activeElements, activeComponents, components: allComponents} = state;

        if (activeElements.length === 0) return;

        const activeElement = activeElements[0];
        const activeComponent = activeComponents[0];
        if (!activeComponent) return;

        const components = allComponents;
        const activeComponentIndex = components.findIndex(comp => comp.id === activeComponent.id);
        const componentElements = components[activeComponentIndex].elements.sort((a, b) => a.index - b.index);
        const targetElementIndex = componentElements.findIndex(el => el.id === activeElement.id);

        if (targetElementIndex > 0) {
            const previousElement = componentElements[targetElementIndex - 1];

            // Swap the indices
            const tempIndex = activeElement.index;
            activeElement.index = previousElement.index;
            previousElement.index = tempIndex;

            // Update the component elements
            componentElements[targetElementIndex] = previousElement;
            componentElements[targetElementIndex - 1] = activeElement;

            components[activeComponentIndex].elements = componentElements;

            setPreviewState({components, activeElements});
        }
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

    return {
        appendElement,
        prependElement,
        duplicateElement,
        deleteElement,
        incrementElementIndex,
        decrementElementIndex,
        updateElementAttributes,
        setActiveElement,
        updateElement
    };
};