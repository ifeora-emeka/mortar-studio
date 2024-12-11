import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";


export default function ToolbarCopyOptions ({children}: {children: React.ReactNode}) {
    const { duplicateElement, copyActiveElement, pasteElement } = useElement();
    const { state: {activeElements} } = usePreviewContext();
    const isParent = !activeElements[0]?.parent_element_id;

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'my-default'}>
                {!isParent && <DropdownMenuItem>Cut</DropdownMenuItem>}
                <DropdownMenuItem onClick={copyActiveElement}>Copy</DropdownMenuItem>
                <DropdownMenuItem onClick={pasteElement}>Paste</DropdownMenuItem>
                {!isParent && <DropdownMenuItem onClick={duplicateElement}>Duplicated</DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>

    </>
}
