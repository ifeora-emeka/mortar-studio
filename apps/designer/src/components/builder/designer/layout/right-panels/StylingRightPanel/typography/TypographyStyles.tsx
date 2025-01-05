import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import ColorProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/typography/ColorProperty.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import StylePropertyGrid
    from "@/components/builder/designer/layout/right-panels/StylePropertyGrid.tsx";
import FontSizeProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/typography/FontSizeProperty.tsx";
import FontFamilyProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/typography/FontFamilyProperty.tsx";
import FrontWeightProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/typography/FrontWeightProperty.tsx";
import LineHeight
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/typography/LineHeight.tsx";
import TextAlignProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/typography/TextAlignProperty.tsx";

export default function TypographyStyles() {
    const {state: {activeElements}} = usePreviewContext();

    if (activeElements[0]?.textContent !== null) {
        return <>
            <AccordionItem value="typography">
                <AccordionTrigger>
                    Typography
                </AccordionTrigger>
                <AccordionContent>
                    <FontFamilyProperty/>
                    <StylePropertyGrid>
                        <ColorProperty/>
                        <FontSizeProperty/>
                    </StylePropertyGrid>
                    <StylePropertyGrid>
                        <FrontWeightProperty/>
                        <LineHeight/>
                    </StylePropertyGrid>
                    <StylePropertyGrid>
                        <TextAlignProperty/>
                    </StylePropertyGrid>
                </AccordionContent>
            </AccordionItem>
        </>
    } else {
        return null;
    }

}
