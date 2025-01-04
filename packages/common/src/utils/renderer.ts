import {MortarElementInstance} from "../schemas/instance.schema.js";
import {MortarElement} from "../schemas/elements.schema.js";
import {SupportedRef} from "../schemas/variables.schema.js";


export function compileInstances(instances: MortarElementInstance[]): MortarElementInstance[] {
    const instanceMap: { [key: string]: MortarElementInstance } = {};
    const roots: MortarElementInstance[] = [];

    instances.forEach(instance => {
        instance.children = [];
        instanceMap[instance.id] = instance;
    });

    instances.forEach(instance => {
        if (instance.parentInstance) {
            const parent = instanceMap[instance.parentInstance];
            if (parent) {
                parent.children.push(instance);
            }
        } else {
            roots.push(instance);
        }
    });

    const sortInstances = (instances: MortarElementInstance[]) => {
        instances.forEach(instance => {
            instance.children.sort((a, b) => a.index - b.index);
            sortInstances(instance.children);
        });
    };

    sortInstances(roots);

    return roots;
}

export function compileElements(elements: MortarElement[]): MortarElement[] {
    const elementMap: { [key: string]: MortarElement } = {};
    const roots: MortarElement[] = [];

    elements.forEach(element => {
        element.children = [];
        elementMap[element.id] = element;
    });

    elements.forEach(element => {
        if (element.parent_element_id) {
            const parent = elementMap[element.parent_element_id];
            if (parent) {
                parent.children.push(element);
            }
        } else {
            roots.push(element);
        }
    });

    const sortElements = (elements: MortarElement[]) => {
        elements.forEach((element: MortarElement) => {
            // @ts-ignore
            element.children.sort((a, b) => a.index - b.index);
            // @ts-ignore
            sortElements(element.children);
        });
    };

    sortElements(roots);

    return roots;
}

export const outputVariableRef = ({id, type}: { id: string; type: SupportedRef }) => {
    return `ref::${type}::${id}`;
}