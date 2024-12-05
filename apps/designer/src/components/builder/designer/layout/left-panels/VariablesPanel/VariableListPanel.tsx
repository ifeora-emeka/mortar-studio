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
import {MortarVariable, MortarVariableType} from "@repo/common/schema/variables";
import {v7 as UID} from "uuid";
import slugify from "slugify";
import EachVariable
    from "@/components/builder/designer/layout/left-panels/VariablesPanel/EachVariable.tsx";

export default function VariableListPanel({show, selectedSetID}: {
    show: boolean;
    selectedSetID: string | null
}) {
    const {state: {variables}, pushToArray} = usePreviewContext();

    const defaultValue = (type: unknown) => {
        switch (type) {
            case "color":
                return "#ffffff";
            case "measurement":
                return "0px";
            case "boolean":
                return "false";
            case "text":
                return "default value";
            default:
                return "default value";
        }
    }

    const handleAddVariable = (type: MortarVariableType) => {
        if (!selectedSetID) return;
        const newVariable: MortarVariable = {
            id: UID(),
            name: "Untitled variable",
            index: variables.length,
            type,
            lightValue: defaultValue(type),
            darkValue: type !== 'color' ? defaultValue(type) : null,
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
                        <TableHead className={'min-w-[50px] max-w-[50px]'}></TableHead>
                        <TableHead
                            className={'min-w-[200px] max-w-[200px]'}>Name</TableHead>
                        <TableHead
                            className={'min-w-[100px] max-w-[100px]'}>Light</TableHead>
                        <TableHead
                            className={'min-w-[100px] max-w-[100px]'}>Dark</TableHead>
                        <TableHead className={'min-w-[50px] max-w-[50px] text-center'}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={'mx-auto'}>
                                        <Plus className={'h-6 w-6'}/>
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
            <div className={'h-52'}/>
        </div>
    );
}

