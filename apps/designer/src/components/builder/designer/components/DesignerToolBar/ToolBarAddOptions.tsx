import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {FrameIcon, Heading, ImageIcon, Pilcrow, SquareDashed} from "lucide-react";
import AddComponentModal
    from "@/components/builder/designer/components/AddComponentModal.tsx";
import {useState} from "react";

export default function ToolBarAddOptions({children}: { children: React.ReactNode }) {
    const [showAdd, setShowAdd] = useState(false);

    return <>
        <AddComponentModal open={showAdd} onOpen={setShowAdd}/>
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'mb-default'}>
                <DropdownMenuLabel>Components</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setShowAdd(true)}><SquareDashed/>Empty component</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuLabel>Elements</DropdownMenuLabel>
                <DropdownMenuItem><FrameIcon/> Div</DropdownMenuItem>
                <DropdownMenuItem><Heading/> Heading</DropdownMenuItem>
                <DropdownMenuItem><Pilcrow/> Paragraph</DropdownMenuItem>
                <DropdownMenuItem><ImageIcon/>Image</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}
