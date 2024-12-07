import {MortarElement} from "@repo/common/schema/element";
import {
    defaultStaticElements
} from "@/components/builder/static-elements/index.static.ts";

export function staticParagraph(): MortarElement {
    return {
        ...defaultStaticElements,
        htmlTag: 'p',
        customProps: {
            children: ['Default paragraph']
        }
    }

}
