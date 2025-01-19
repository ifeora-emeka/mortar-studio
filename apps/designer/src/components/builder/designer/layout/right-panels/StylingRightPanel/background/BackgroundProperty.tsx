import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import BackgroundColorProperty
    from "./BackgroundColorProperty.tsx";
import StylePropertyGrid
    from "@/components/builder/designer/layout/right-panels/StylePropertyGrid.tsx";
import BackgroundOpacity
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/background/BackgroundOpacity.tsx";
import BackgroundImageProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/background/BackgroundImageProperty.tsx";

export default function BackgroundProperty() {
    return <>
        <AccordionItem value="background">
            <AccordionTrigger>
                Background
            </AccordionTrigger>
            <AccordionContent>
                <StylePropertyGrid>
                    <BackgroundColorProperty/>
                    <BackgroundOpacity />
                </StylePropertyGrid>
                <BackgroundImageProperty />
            </AccordionContent>
        </AccordionItem>
    </>
}
