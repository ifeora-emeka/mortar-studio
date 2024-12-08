import { usePreviewContext } from "@/components/builder/context/preview.context.tsx";
import { MortarElement } from "@repo/common/schema/element";
import { v4 as uuidv4 } from 'uuid';
import { defaultStaticElements } from "@/components/builder/static-elements/index.static.ts";

export const useElement = () => {
    const { state, setPreviewState } = usePreviewContext();

    const getActiveComponent = () => {
        const { activeElements, components } = state;
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
        const updatedActiveElement = {
            ...activeElement,
            children: [...activeElement.children, newElement.id]
        };

        const updatedComponent = {
            ...activeComponent,
            elements: updatedElements.map(el => el.id === activeElement.id ? updatedActiveElement : el),
        };

        setPreviewState({
            components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [newElement]
        });
    };

    const prependElement = (elementData: MortarElement) => {
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const activeElement = state.activeElements[0];
        const newElement: MortarElement = {
            ...elementData,
            id: uuidv4(),
            parent_element_id: activeElement.id,
            index: 0,
            children: elementData.children || [],
        };

        const updatedElements = [...activeComponent.elements, newElement];
        const updatedActiveElement = {
            ...activeElement,
            children: [newElement.id, ...activeElement.children]
        };

        const updatedChildren = activeElement.children.map((childId, idx) => {
            const childIndex = activeComponent.elements.findIndex(el => el.id === childId);
            return { ...activeComponent.elements[childIndex], index: idx + 1 };
        });

        const updatedComponent = {
            ...activeComponent,
            elements: updatedElements.map(el => {
                if (el.id === activeElement.id) return updatedActiveElement;
                const child = updatedChildren.find(child => child.id === el.id);
                return child ? child : el;
            })
        };

        setPreviewState({
            components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
            activeElements: [newElement]
        });
    };

    const duplicateElement = () => {
        const elementId = state.activeElements[0]?.id;
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const elementIndex = activeComponent.elements.findIndex(el => el.id === elementId);
        if (elementIndex === -1) return;

        const element = activeComponent.elements[elementIndex];

        if (!element.parent_element_id) {
            const componentId = activeComponent.id;

            // Find the instance that has the ref referencing the component
            const instanceIndex = state.instances.findIndex(instance => instance.ref.endsWith(componentId));
            if (instanceIndex !== -1) {
                const instance = state.instances[instanceIndex];
                const newInstance = {
                    ...instance,
                    id: uuidv4(),
                    children: instance.children.map(child => ({
                        ...child,
                        id: uuidv4()
                    }))
                };
                setPreviewState({
                    instances: [...state.instances, newInstance]
                });
            }
            return;
        }

        const duplicateElementRecursively = (element: MortarElement, parentId: string | null) => {
            const newElement: MortarElement = {
                ...element,
                id: uuidv4(),
                parent_element_id: parentId,
                children: element.children.map(childId => {
                    if (typeof childId === 'string') {
                        const childElement = activeComponent.elements.find(el => el.id === childId);
                        return childElement ? duplicateElementRecursively(childElement, newElement.id).id : childId;
                    }
                    return childId;
                })
            };
            return newElement;
        };

        const newElement = duplicateElementRecursively(element, element.parent_element_id);
        const updatedElements = [...activeComponent.elements, newElement];

        const parentIndex = activeComponent.elements.findIndex(el => el.id === element.parent_element_id);
        if (parentIndex !== -1) {
            const parentElement = activeComponent.elements[parentIndex];
            const updatedParentElement = {
                ...parentElement,
                children: [...parentElement.children, newElement.id]
            };
            const updatedComponent = {
                ...activeComponent,
                elements: updatedElements.map(el => el.id === parentElement.id ? updatedParentElement : el)
            };
            setPreviewState({
                components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
                activeElements: [newElement]
            });
        } else {
            const updatedComponent = {
                ...activeComponent,
                elements: updatedElements
            };
            setPreviewState({
                components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp),
                activeElements: [newElement]
            });
        }
    };

    const deleteElement = () => {
        const elementId = state.activeElements[0]?.id
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const elementIndex = activeComponent.elements.findIndex(el => el.id === elementId);
        if (elementIndex === -1) return;

        const element = activeComponent.elements[elementIndex];

        if (!element.parent_element_id) {
            const componentId = activeComponent.id;

            const instanceIndex = state.instances.findIndex(instance => instance.ref.endsWith(componentId));
            if (instanceIndex !== -1) {
                setPreviewState({
                    instances: state.instances.filter((_, index) => index !== instanceIndex)
                });
            }
            return;
        }

        const deleteElementRecursively = (elementId: string) => {
            const elementIndex = activeComponent.elements.findIndex(el => el.id === elementId);
            if (elementIndex === -1) return;

            const element = activeComponent.elements[elementIndex];
            element.children.forEach(childId => {
                if (typeof childId === 'string') {
                    deleteElementRecursively(childId);
                }
            });

            activeComponent.elements = activeComponent.elements.filter(el => el.id !== elementId);
        };

        deleteElementRecursively(elementId);

        const parentIndex = activeComponent.elements.findIndex(el => el.id === element.parent_element_id);
        if (parentIndex !== -1) {
            const parentElement = activeComponent.elements[parentIndex];
            const updatedParentElement = {
                ...parentElement,
                children: parentElement.children.filter(childId => childId !== elementId)
            };
            activeComponent.elements = activeComponent.elements.map(el => el.id === parentElement.id ? updatedParentElement : el);
        }

        setPreviewState({
            components: state.components.map(comp => comp.id === activeComponent.id ? activeComponent : comp)
        });
    };

    const incrementElementIndex = () => {
        const elementId = state.activeElements[0]?.id;
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const elementIndex = activeComponent.elements.findIndex(el => el.id === elementId);
        if (elementIndex === -1) return;

        const element = activeComponent.elements[elementIndex];
        const parentElement = activeComponent.elements.find(el => el.id === element.parent_element_id);
        if (!parentElement) return;

        const siblingIndex = parentElement.children.findIndex(childId => childId === elementId);
        if (siblingIndex === -1 || siblingIndex === parentElement.children.length - 1) return;

        const siblingId = parentElement.children[siblingIndex + 1];
        const siblingElementIndex = activeComponent.elements.findIndex(el => el.id === siblingId);

        const updatedElement = { ...element, index: element.index + 1 };
        const updatedSiblingElement = { ...activeComponent.elements[siblingElementIndex], index: element.index };

        const newChildren = [...parentElement.children];
        [newChildren[siblingIndex], newChildren[siblingIndex + 1]] = [newChildren[siblingIndex + 1], newChildren[siblingIndex]];

        const updatedParentElement = { ...parentElement, children: newChildren };

        const updatedComponent = {
            ...activeComponent,
            elements: activeComponent.elements.map(el => {
                if (el.id === element.id) return updatedElement;
                if (el.id === siblingId) return updatedSiblingElement;
                if (el.id === parentElement.id) return updatedParentElement;
                return el;
            })
        };

        setPreviewState({
            components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp)
        });
    };

    const decrementElementIndex = () => {
        const elementId = state.activeElements[0]?.id;
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const elementIndex = activeComponent.elements.findIndex(el => el.id === elementId);
        if (elementIndex === -1) return;

        const element = activeComponent.elements[elementIndex];
        const parentElement = activeComponent.elements.find(el => el.id === element.parent_element_id);
        if (!parentElement) return;

        const siblingIndex = parentElement.children.findIndex(childId => childId === elementId);
        if (siblingIndex === -1 || siblingIndex === 0) return;

        const siblingId = parentElement.children[siblingIndex - 1];
        const siblingElementIndex = activeComponent.elements.findIndex(el => el.id === siblingId);

        const updatedElement = { ...element, index: element.index - 1 };
        const updatedSiblingElement = { ...activeComponent.elements[siblingElementIndex], index: element.index };

        const newChildren = [...parentElement.children];
        [newChildren[siblingIndex], newChildren[siblingIndex - 1]] = [newChildren[siblingIndex - 1], newChildren[siblingIndex]];

        const updatedParentElement = { ...parentElement, children: newChildren };

        const updatedComponent = {
            ...activeComponent,
            elements: activeComponent.elements.map(el => {
                if (el.id === element.id) return updatedElement;
                if (el.id === siblingId) return updatedSiblingElement;
                if (el.id === parentElement.id) return updatedParentElement;
                return el;
            })
        };

        setPreviewState({
            components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp)
        });
    };

    const updateElementAttributes = (attributes: Record<string, string>) => {
        const { activeElements, components } = state;

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

    return {
        appendElement,
        prependElement,
        duplicateElement,
        deleteElement,
        incrementElementIndex,
        decrementElementIndex,
        updateElementAttributes
    };
};