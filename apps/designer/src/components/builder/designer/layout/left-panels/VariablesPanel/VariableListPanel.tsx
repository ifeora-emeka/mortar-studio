import {cn} from "@/lib/utils.ts";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {LetterText, Palette, Plus, Ruler, ToggleLeft} from "lucide-react";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MortarVariable} from "@repo/common/schema/variables";
import {v7 as UID} from "uuid";
import slugify from "slugify";
import EachVariable
    from "@/components/builder/designer/layout/left-panels/VariablesPanel/EachVariable.tsx";

export default function VariableListPanel({show, selectedSetID}: {
    show: boolean;
    selectedSetID: string | null
}) {
    const {state: {variables}, pushToArray} = usePreviewContext();


    const handleAddVariable = (type: MortarVariable["type"]) => {
        if (!selectedSetID) return;
        const newVariable: (MortarVariable & { new?: boolean }) = {
            id: UID(),
            name: "Untitled variable",
            index: variables.length,
            type,
            value: "",
            isDarkMode: false,
            setID: selectedSetID,
            slug: slugify(`variable-${variables.length}`),
            new: true
        };
        pushToArray("variables", newVariable);
    };



    const filteredVariables = variables.filter(variable => variable.setID === selectedSetID);

    return (
        <div
            className={cn("bg-card border-r min-h-[--body-height] max-h-[--body-height] fixed z-30 w-[calc(var(--panel-width)+var(--panel-width))] shadow-xl transition-all", {
                "left-[-40rem] duration-300": !show,
                "left-[calc(var(--header-height)+var(--panel-width))] duration-500": show
            })}>
            <Table>
                <TableHeader className={`h-header`}>
                    <TableRow className={'hover:bg-card'}>
                        <TableHead className={'w-[80px]'}></TableHead>
                        <TableHead className={'w-[200px]'}>Name</TableHead>
                        <TableHead>Light</TableHead>
                        <TableHead>Dark</TableHead>
                        <TableHead>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={'mx-auto'}>
                                        <Plus/>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Select type</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem
                                        onClick={() => handleAddVariable("color")}><Palette/> Color</DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleAddVariable("measurement")}><Ruler/> Measurement</DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleAddVariable("text")}><LetterText/> String</DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleAddVariable("boolean")}><ToggleLeft/> Boolean</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredVariables.map((variable) => (
                        <EachVariable variable={variable} key={variable.id}/>
                    ))}
                </TableBody>
            </Table>
            <div className={'h-52'} />
        </div>
    );
}

