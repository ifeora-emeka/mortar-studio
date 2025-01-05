import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import DisplayProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/layout/DisplayProperty.tsx";
import FlexDirectionProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/layout/FlexDirectionProperty.tsx";
import StylePropertyGrid
    from "@/components/builder/designer/layout/right-panels/StylePropertyGrid.tsx";
import FlexWrapProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/layout/FlexWrapProperty.tsx";
import GapYProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/layout/GapYProperty.tsx";
import GapXProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/layout/GapXProperty.tsx";
import AlignItemsProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/layout/AlignItemsProperty.tsx";
import JustifyContentProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/layout/JustifyContentProperty.tsx";
import OverflowProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/layout/OverflowProperty.tsx";

export default function LayoutProperty() {
    return <>
        <AccordionItem value="layout">
            <AccordionTrigger>
                Layout
            </AccordionTrigger>
            <AccordionContent>
                <DisplayProperty/>
                <StylePropertyGrid>
                    <FlexDirectionProperty/>
                    <FlexWrapProperty/>
                </StylePropertyGrid>
                <StylePropertyGrid>
                    <GapXProperty/>
                    <GapYProperty/>
                </StylePropertyGrid>
                <AlignItemsProperty/>
                <JustifyContentProperty/>
                <StylePropertyGrid>
                    <OverflowProperty/>
                </StylePropertyGrid>
            </AccordionContent>
        </AccordionItem>
    </>
}
