import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import PositionProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/position/PositionProperty.tsx";
import StylePropertyGrid
    from "@/components/builder/designer/layout/right-panels/StylePropertyGrid.tsx";
import TopProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/position/TopProperty.tsx";
import BottomProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/position/BottomProperty.tsx";
import LeftProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/position/LeftProperty.tsx";
import RightProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/position/RightProperty.tsx";

export default function PlacementProperty(){
    return <>
        <AccordionItem value="placement">
            <AccordionTrigger>
                Placement
            </AccordionTrigger>
            <AccordionContent>
                <PositionProperty />
                <StylePropertyGrid>
                    <TopProperty />
                    <BottomProperty />
                </StylePropertyGrid>
                <StylePropertyGrid>
                    <LeftProperty />
                    <RightProperty />
                </StylePropertyGrid>
            </AccordionContent>
        </AccordionItem>
    </>
}
