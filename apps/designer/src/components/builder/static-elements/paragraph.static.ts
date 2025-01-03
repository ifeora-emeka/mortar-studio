import {MortarElement} from "@repo/common/schema/element";
import {
    defaultStaticElements
} from "@/components/builder/static-elements/index.static.ts";

export function staticParagraph(): MortarElement {
    return {
        ...defaultStaticElements,
        name: "paragraph",
        htmlTag: 'p',
        textContent: "Default paragraph"
    }
}
