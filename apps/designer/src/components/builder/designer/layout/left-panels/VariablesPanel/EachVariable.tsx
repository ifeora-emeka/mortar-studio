import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Lock, Trash2} from "lucide-react";
import {MortarVariable} from "@repo/common/schema/variables";
import {useEffect, useRef, useState} from "react";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {cn} from "@/lib/utils.ts";
import ColorInput from "@/components/builder/designer/components/ColorInput.tsx";
import MeasurementInput from "@/components/builder/designer/components/MeasurementInput.tsx";

const EachVariable = ({variable}: {
    variable: (MortarVariable & { new?: boolean });
}) => {
    const {updateItemInArray, removeFromArray, state: {variables}} = usePreviewContext();
    const [editMode, setEditMode] = useState(variable?.new || false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState({
        name: variable.name,
        lightValue: variable.lightValue,
        darkValue: variable.darkValue,
    });

    const supportsDark = variable.type === 'color';

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

    const updateValue = () => {
        const index = variables.findIndex(v => v.id === variable.id);
        updateItemInArray({
            index,
            key: 'variables',
            data: {
                name: data.name,
                lightValue: data.lightValue,
                darkValue: data.darkValue,
                new: false
            } as Partial<MortarVariable>
        });
        setEditMode(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateValue();
        }
    };

    const handleDelete = () => {
        removeFromArray('variables', variable.id);
    };

    return (
        <TableRow className={cn("h-header group")}>
            <TableCell className={'min-w-[50px] max-w-[50px]'}>
                {
                    variable.isStatic &&
                    <Lock className={'h-4 w-4 mx-auto text-muted-foreground'}/>
                }
            </TableCell>
            <TableCell className={'min-w-[200px] max-w-[200px]'}>
                {editMode ? (
                    <input
                        autoFocus
                        type="text"
                        value={data.name}
                        className="bg-transparent w-full"
                        ref={inputRef}
                        onBlur={updateValue}
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
            <TableCell className={'min-w-[100px] max-w-[100px]'}>
                {/*   LIGHT    */}
                {
                    variable.type === 'color' && <ColorInput
                        value={data.lightValue}
                        onBlur={updateValue}
                        disabled={!supportsDark}
                        onChange={(value) => {
                            setData({
                                ...data,
                                lightValue: value,
                            });
                            updateValue();
                        }}
                    />
                }
                {
                    variable.type === 'measurement' && <MeasurementInput
                        value={data.lightValue}
                        onBlur={updateValue}
                        onChange={(value) => {
                            setData({
                                ...data,
                                lightValue: value,
                            });
                            updateValue();
                        }}
                    />
                }
            </TableCell>
            <TableCell className={'min-w-[100px] max-w-[100px]'}>
                {/*   DARK    */}
                {
                    variable.type === 'color' && data.darkValue && <ColorInput
                        value={data.darkValue}
                        onBlur={updateValue}
                        onChange={(value) => {
                            setData({
                                ...data,
                                darkValue: value,
                            });
                            updateValue();
                        }}
                    />
                }
                {
                    variable.type === 'measurement' && data.darkValue && supportsDark && <MeasurementInput
                        value={data.darkValue}
                        onBlur={updateValue}
                        onChange={(value) => {
                            setData({
                                ...data,
                                darkValue: value,
                            });
                            updateValue();
                        }}
                    />
                }
            </TableCell>
            <TableCell className={'min-w-[50px] max-w-[50px]'}>
                <div className={'h-4 w-4 mx-auto'}>
                    {
                        !editMode && !variable.isStatic && <button
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground focus:opacity-100"
                            onClick={handleDelete}>
                            <Trash2 className={'h-4 w-4'}/>
                        </button>
                    }
                </div>
            </TableCell>
        </TableRow>
    );
};

export default EachVariable;