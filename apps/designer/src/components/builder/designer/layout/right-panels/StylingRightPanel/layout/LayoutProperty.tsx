import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";

export default function LayoutProperty(){
    return <>
        <AccordionItem value="layout">
            <AccordionTrigger>
                Layout
            </AccordionTrigger>
            <AccordionContent>

            </AccordionContent>
        </AccordionItem>
    </>
}
