import {Button} from "@/components/ui/button.tsx";
import {
    GitBranch,
    GitBranchPlus,
    GitMerge, MonitorDot, MonitorSmartphone,
    Moon, Settings, Smartphone, Tablet,
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
import {Separator} from "@/components/ui/separator.tsx";


export default function DesignerHeader() {
    const {setTheme, theme} = useTheme();
    const {sendSync, setPreviewState, state: {activeBreakpoint}} = usePreviewContext();

    return <header
        className="bg-card border-b h-header flex justify-between items-center px-default z-20">
        <h1 className="text-2xl font-bold text-muted-foreground">Mortar Studio</h1>
        <div className={'flex items-center gap-sm'}>
            <Button size={'icon'} variant={'secondary'}
                    onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
                <Moon/>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'secondary'}>
                        <MonitorSmartphone/> {activeBreakpoint}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Screen size</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => setPreviewState({activeBreakpoint: 'lg'})}>
                        <MonitorDot/> Desktop
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPreviewState({activeBreakpoint: 'md'})}>
                        <Tablet/> Tablet
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPreviewState({activeBreakpoint: 'default'})}>
                        <Smartphone/> Mobile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem><Settings/> Custom size</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'secondary'}>
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

            <Separator orientation={'vertical'}/>

            <Button onClick={sendSync}>
                <Upload/> Push
            </Button>


        </div>
    </header>
}

