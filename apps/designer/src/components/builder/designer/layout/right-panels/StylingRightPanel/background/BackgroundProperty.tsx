import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import BackgroundColorProperty
    from "./BackgroundColorProperty.tsx";

export default function BackgroundProperty(){
    return <>
        <AccordionItem value="background">
            <AccordionTrigger>
                Background
            </AccordionTrigger>
            <AccordionContent>
                <BackgroundColorProperty />
            </AccordionContent>
        </AccordionItem>
    </>
}
