import {MortarElement} from "@repo/common/schema/element";
import {
    defaultStaticElements
} from "@/components/builder/static-elements/index.static.ts";

export function staticHeading(): MortarElement {
    return {
        ...defaultStaticElements,
        htmlTag: 'h1',
        customProps: {
            children: ['Default heading']
        }
    }

}
