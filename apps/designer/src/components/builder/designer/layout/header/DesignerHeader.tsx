import {Button} from "@/components/ui/button.tsx";
import {
    GitBranch,
    GitBranchPlus,
    GitMerge,
    Moon,
    Trash2,
    Upload
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTheme} from "@/components/theme-provider.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";


export default function DesignerHeader() {
    const {setTheme, theme} = useTheme();
    const { sendSync } = usePreviewContext();

    return <header
        className="bg-card border-b h-header flex justify-between items-center px-default z-[1000]">
        <h1 className="text-2xl font-bold text-muted-foreground">Mortar Studio</h1>
        <div className={'flex items-center gap-default'}>
            <Button size={'icon'} variant={'secondary'}
                    onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
                <Moon/>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'secondary'} className={'dark:hover:bg-pink-200'}>
                        <GitBranch/> main
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Branches</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem><GitBranch/> main</DropdownMenuItem>
                    <DropdownMenuItem><GitBranch/> staging</DropdownMenuItem>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem><GitBranchPlus/> New branch</DropdownMenuItem>
                    <DropdownMenuItem><GitMerge/> Merge branch</DropdownMenuItem>
                    <DropdownMenuItem><Trash2/> Delete branch</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


            <Button onClick={sendSync}>
                <Upload/> Push
            </Button>


        </div>
    </header>
}

