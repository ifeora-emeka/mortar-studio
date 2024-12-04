import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Lock, Trash2} from "lucide-react";
import {MortarVariable} from "@repo/common/schema/variables";
import {useEffect, useRef, useState} from "react";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {cn} from "@/lib/utils.ts";

const EachVariable = ({variable}: {
    variable: (MortarVariable & { new?: boolean });
}) => {
    const {updateItemInArray, state: {variables}} = usePreviewContext();
    const [editMode, setEditMode] = useState(variable?.new || false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState({
        name: variable.name,
        value: variable.value
    });

    useEffect(() => {
        setTimeout(() => {
            if (editMode && inputRef.current) {
                inputRef.current.focus();
                inputRef.current.select();
            }
        }, 250)
    }, [editMode]);

    useEffect(() => {
        if (variable?.new) {
            setEditMode(true);
        }
    }, [variable]);

    const handleBlur = () => {
        const index = variables.findIndex(v => v.id === variable.id);
        updateItemInArray({index, key: 'variables', data: {name: data.name, new: false}});
        setEditMode(false);
    };

    const updateValue = () => {
        const index = variables.findIndex(v => v.id === variable.id);
        updateItemInArray({index, key: 'variables', data: {value: data.value}});
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <TableRow className={cn("h-header group")}>
            <TableCell>
                <Lock className={'h-4 w-4 mx-auto text-muted-foreground'}/>
            </TableCell>
            <TableCell>
                {editMode ? (
                    <input
                        autoFocus
                        type="text"
                        value={data.name}
                        className="bg-transparent w-full"
                        ref={inputRef}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setData({
                            ...data,
                            name: e.target.value
                        })}
                    />
                ) : (
                    <span onDoubleClick={() => setEditMode(true)}>
                        {variable.name}
                    </span>
                )}
            </TableCell>
            <TableCell>
                <input
                    value={data.value}
                    className={'bg-card text-card-foreground p-1 rounded-md'}
                    onChange={(e) => {
                        setData({
                            ...data,
                            value: e.target.value
                        })
                    }}
                    onBlur={updateValue}
                />
            </TableCell>
            <TableCell>{variable.value}</TableCell>
            <TableCell>
                <button
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground">
                    <Trash2 className={'h-4 w-4'}/>
                </button>
            </TableCell>
        </TableRow>
    );
};

export default EachVariable;