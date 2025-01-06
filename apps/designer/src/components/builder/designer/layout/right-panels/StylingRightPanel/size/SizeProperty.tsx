import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import WidthProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/size/WidthProperty.tsx";
import StylePropertyGrid
    from "@/components/builder/designer/layout/right-panels/StylePropertyGrid.tsx";
import HeightProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/size/HeightProperty.tsx";

export default function SizeProperty() {
    return <>
        <AccordionItem value="size">
            <AccordionTrigger>
                Size
            </AccordionTrigger>
            <AccordionContent>
                <StylePropertyGrid>
                    <WidthProperty/>
                    <HeightProperty/>
                </StylePropertyGrid>
            </AccordionContent>
        </AccordionItem>
    </>
}
