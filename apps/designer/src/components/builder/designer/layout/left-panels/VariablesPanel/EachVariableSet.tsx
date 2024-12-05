import {MortarVariableSet} from "@repo/common/schema/variables";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {useEffect, useRef, useState} from "react";
import {EllipsisVertical, Lock, Pencil, Trash2} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {cn} from "@/lib/utils.ts";

const EachVariableSet = ({ variableSet, onClick, active, onSetSelect }: { variableSet: (MortarVariableSet & { new?: boolean }); onClick: () => void; active: boolean; onSetSelect: (set: MortarVariableSet | null) => void; }) => {
    const { updateItemInArray, removeFromArray, setPreviewState, state: { variableSets, variables } } = usePreviewContext();
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState(variableSet.name);

    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.select();
        }
    }, [editMode]);

    useEffect(() => {
        setName(variableSet.name);
        if (variableSet.new) {
            setEditMode(true);
        }
    }, []);

    const handleBlur = () => {
        const index = variableSets.findIndex(set => set.id === variableSet.id);
        updateItemInArray({ index, key: 'variableSets', data: { name, new: false } });
        onSetSelect(variableSet)
        setEditMode(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    const handleDelete = () => {
        setTimeout(() => {
            onSetSelect(null)
        },100)
        removeFromArray('variableSets', variableSet.id);

        const updatedVariables = variables.filter(variable => variable.setID !== variableSet.id);
        setPreviewState({ variables: updatedVariables });
    };

    return (
        <div className={cn("border-b p-default flex gap-default items-center hover:bg-accent group cursor-pointer transition-all duration-200 max-h-header", {
            "bg-accent text-foreground border-card": active
        })} onClick={onClick}>
            <span className={cn("text-muted-foreground group-hover:text-foreground", {
                "text-foreground": active
            })}>
                {
                    variableSet.isStatic && <Lock className="h-4 w-4" />
                }
            </span>
            <div className={cn("flex-1 text-muted-foreground group-hover:text-foreground transition-all duration-300", {
                "text-foreground": active
            })} onDoubleClick={() => setEditMode(true)}>
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
                    variableSet.name
                )}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground focus:opacity-100">
                        <EllipsisVertical/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setEditMode(true)}><Pencil /> Edit</DropdownMenuItem>
                    {
                        !variableSet?.isStatic && <>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={handleDelete}><Trash2 /> Delete</DropdownMenuItem>
                        </>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default EachVariableSet;