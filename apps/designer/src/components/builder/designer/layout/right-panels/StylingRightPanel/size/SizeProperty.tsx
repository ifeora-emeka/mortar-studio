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
import MinHeightProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/size/MinHeightProperty.tsx";
import MaxHeightProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/size/MaxHeightProperty.tsx";
import MinWidthProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/size/MinWidthProperty.tsx";
import MaxWidthProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/size/MaxWidthProperty.tsx";

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
                <StylePropertyGrid>
                    <MinHeightProperty/>
                    <MaxHeightProperty/>
                </StylePropertyGrid>
                <StylePropertyGrid>
                    <MinWidthProperty/>
                    <MaxWidthProperty/>
                </StylePropertyGrid>
            </AccordionContent>
        </AccordionItem>
    </>
}
