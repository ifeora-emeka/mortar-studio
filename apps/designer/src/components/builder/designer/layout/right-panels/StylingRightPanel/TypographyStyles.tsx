import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";

export default function TypographyStyles() {
    return <>
        <AccordionItem value="typography">
            <AccordionTrigger>
                Typography
            </AccordionTrigger>
            <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
    </>
}
