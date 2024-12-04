import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { Lock, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { MortarVariable } from "@repo/common/schema/variables";
import { useEffect, useRef, useState } from "react";
import { usePreviewContext } from "@/components/builder/context/preview.context.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils.ts";

const EachVariable = ({ variable }: { variable: (MortarVariable & { new?: boolean }); }) => {
    const { updateItemInArray, state: { variables } } = usePreviewContext();
    const [editMode, setEditMode] = useState(variable?.new || false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState(variable.name);

    useEffect(() => {
            setTimeout(() => {
        if (editMode && inputRef.current) {
                inputRef.current.focus();
                inputRef.current.select();
        }
            },250)
    }, [editMode]);

    useEffect(() => {
        if (variable?.new) {
            setEditMode(true);
        }
    }, [variable]);

    const handleBlur = () => {
        const index = variables.findIndex(v => v.id === variable.id);
        updateItemInArray({ index, key: 'variables', data: { name, new: false } });
        setEditMode(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <TableRow className={cn("h-header")}>
            <TableCell>
                <Lock className={'h-4 w-4 mx-auto text-muted-foreground'} />
            </TableCell>
            <TableCell>
                {editMode ? (
                    <input
                        autoFocus
                        type="text"
                        value={name}
                        className="bg-transparent w-full"
                        ref={inputRef}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <span onDoubleClick={() => setEditMode(true)}>
                        {variable.name}
                    </span>
                )}
            </TableCell>
            <TableCell>{variable.value}</TableCell>
            <TableCell>{variable.value}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground">
                            <EllipsisVertical />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem><Pencil /> Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Trash2 /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default EachVariable;