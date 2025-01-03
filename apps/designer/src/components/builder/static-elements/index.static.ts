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
    name: 'element'
}
