import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import BorderColorProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/border/BorderColorProperty.tsx";
import StylePropertyGrid
    from "@/components/builder/designer/layout/right-panels/StylePropertyGrid.tsx";
import BorderWidthProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/border/BorderWidthProperty.tsx";
import BorderStyleProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/border/BorderStyleProperty.tsx";
import BorderRadiusProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/border/BorderRadiusProperty.tsx";

export default function BorderProperty() {
    return <>
        <AccordionItem value="border">
            <AccordionTrigger>
                Border
            </AccordionTrigger>
            <AccordionContent>
                <StylePropertyGrid>
                    <BorderColorProperty/>
                    <BorderStyleProperty/>
                </StylePropertyGrid>
                <StylePropertyGrid>
                    <BorderWidthProperty/>
                </StylePropertyGrid>
                <BorderRadiusProperty />
            </AccordionContent>
        </AccordionItem>
    </>
}
