import {MortarElement} from "@repo/common/schema/element";
import {
    defaultStaticElements
} from "@/components/builder/static-elements/index.static.ts";

export function staticFrame(): MortarElement {
    return {
        ...defaultStaticElements,
        name: 'frame',
        htmlTag: 'div',
        attributes: {
            className: 'min-h-[100px] w-[100%] p-5'
        },
        tailwindStyles: {
            default: {
                default: {
                    backgroundColor: '#EFF6FF',
                },
                dark: {},
                hover: {},
                focus: {},
                active: {}
            },
        }
    }

}
