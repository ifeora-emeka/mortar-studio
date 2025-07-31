import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {cn} from "@/lib/utils.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {SearchIcon} from "lucide-react";

type Props = {
    children: React.ReactNode;
    content: React.ReactNode;
    className?: string;
}

export default function DropdownSearch({children, className, content}: Props) {
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn(`max-h-[400px] rounded-xl`, className)}>
                <div className={'flex items-center gap-sm border border-input h-[40px] px-sm rounded-lg'}>
                    <SearchIcon className={'text-muted-foreground'} />
                    <input className={'bg-none outline-none bg-inherit'} placeholder={'Type to search...'} />
                </div>
                <ScrollArea className={'h-[calc(400px-40px)] p-sm'}>
                    {content}
                    <div className={'h-20'} />
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}
