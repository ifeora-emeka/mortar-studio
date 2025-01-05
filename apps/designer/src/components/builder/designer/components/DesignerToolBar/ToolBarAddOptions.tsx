import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    FrameIcon,
    Heading,
    ImageIcon,
    LayoutList,
    Pilcrow, SmilePlus,
    SquareDashed
} from "lucide-react";
import AddComponentModal
    from "@/components/builder/designer/components/AddComponentModal.tsx";
import {useState} from "react";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";
import {staticHeading} from "@/components/builder/static-elements/heading.static.ts";
import {staticParagraph} from "@/components/builder/static-elements/paragraph.static.ts";
import {staticFrame} from "@/components/builder/static-elements/frame.static.ts";
import {staticImage} from "@/components/builder/static-elements/image.static.ts";


export default function ToolBarAddOptions({children}: { children: React.ReactNode }) {
    const [showAdd, setShowAdd] = useState(false);
    const {appendElement} = useElement();

    return <>
        <AddComponentModal open={showAdd} onOpen={setShowAdd}/>
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'mb-default'}>
                <DropdownMenuLabel>Components</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setShowAdd(true)}>
                    <SquareDashed/>New component
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowAdd(true)}>
                    <LayoutList/>Existing component
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuLabel>Elements</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => appendElement({
                        ...staticFrame(),
                        htmlTag: 'div'
                    })}
                >
                    <FrameIcon/> Div
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => appendElement({
                        ...staticHeading(),
                        htmlTag: 'h1'
                    })}
                >
                    <Heading/> Heading
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => appendElement({
                        ...staticParagraph(),
                        htmlTag: 'p'
                    })}
                >
                    <Pilcrow/> Paragraph
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => appendElement({
                        ...staticImage(),
                        htmlTag: 'img'
                    })}
                >
                    <ImageIcon/>Image
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => appendElement({
                        ...staticImage(),
                        htmlTag: 'i'
                    })}
                >
                    <SmilePlus /> Icon
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}