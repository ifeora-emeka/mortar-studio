import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import ColorInput from "@/components/builder/designer/components/ColorInput.tsx";

export default function BackgroundProperty(){
    return <>
        <AccordionItem value="background">
            <AccordionTrigger>
                Background
            </AccordionTrigger>
            <AccordionContent>
                <ColorInput value={'blue'} onChange={console.log} />
            </AccordionContent>
        </AccordionItem>
    </>
}
