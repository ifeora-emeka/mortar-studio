import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";


export default function ToolbarCopyOptions ({children}: {children: React.ReactNode}) {
    const { state: {activeElements} } = usePreviewContext();
    const isParent = !activeElements[0]?.parent_element_id;

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'my-default'}>
                <DropdownMenuItem>Copy</DropdownMenuItem>
                <DropdownMenuItem>Paste</DropdownMenuItem>
                {!isParent && <DropdownMenuItem>Duplicated</DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>

    </>
}
