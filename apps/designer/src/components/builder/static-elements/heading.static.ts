import {MortarElement} from "@repo/common/schema/element";
import {
    defaultStaticElements
} from "@/components/builder/static-elements/index.static.ts";

export function staticHeading(): MortarElement {
    return {
        ...defaultStaticElements,
        name: 'heading',
        htmlTag: 'h1',
        textContent: "Default heading",
        attributes: {
            // className: "text-2xl font-bold"
        },
        tailwindStyles: {
            default: {
                default: {
                    textSize: "10rem"
                }
            }
        }
    }

}
