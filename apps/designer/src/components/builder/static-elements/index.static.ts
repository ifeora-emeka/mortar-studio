import {MortarElement} from "@repo/common/schema/element";
import {generateRandomID} from '@repo/common/utils'

export const defaultStaticElements: MortarElement = {
    htmlTag: 'div',
    parent_element_id: null,
    attributes: {},
    children: [],
    index: 0,
    id: generateRandomID(11),
    style: {},
    textContent: null,
    name: 'element',
    tailwindStyles: {
        default: {
            default: {

            },
            dark: {},
            hover: {},
            focus: {},
            active: {}
        },
        xl: {
            default: {},
            dark: {},
            hover: {},
            focus: {},
            active: {}
        },
        md: {
            default: {},
            dark: {},
            hover: {},
            focus: {},
            active: {}
        },
        lg: {
            default: {},
            dark: {},
            hover: {},
            focus: {},
            active: {}
        }
    }
}
