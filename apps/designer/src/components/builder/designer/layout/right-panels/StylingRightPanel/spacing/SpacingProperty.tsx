import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import PaddingProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/spacing/PaddingProperty.tsx";
import MarginProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/spacing/MarginProperty.tsx";

export default function SpacingProperty() {
    return <>
        <AccordionItem value="spacing">
            <AccordionTrigger>
                Spacing
            </AccordionTrigger>
            <AccordionContent>
                <PaddingProperty/>
                <MarginProperty />
            </AccordionContent>
        </AccordionItem>
    </>
}
