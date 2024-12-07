import {MortarElement} from "@repo/common/schema/element";
import {
    defaultStaticElements
} from "@/components/builder/static-elements/index.static.ts";

export function staticImage(): MortarElement {
    return {
        ...defaultStaticElements,
        htmlTag: 'img',
        attributes: {
            src: 'https://picsum.photos/500/600',
            alt: 'Placeholder image 150x150',
            className: 'w-[150px] h-[150px]'
        },
    }

}
