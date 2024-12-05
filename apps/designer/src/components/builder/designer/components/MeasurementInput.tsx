import {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MeasurementInputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
}

export default function MeasurementInput(
    {
        value,
        onChange,
        onBlur,
        disabled
    }: MeasurementInputProps) {
    const [focus, setFocus] = useState(false);
    const [numericValue, setNumericValue] = useState('');
    const [unit, setUnit] = useState('px');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const match = value.match(/^(\d*\.?\d+)([a-z%]*)$/);
        if (match) {
            setNumericValue(match[1]);
            setUnit(match[2] || 'px');
        }
    }, [value]);

    const handleBlur = () => {
        setFocus(false);
        if (onBlur) {
            onBlur();
        }
        if (!isNaN(parseFloat(numericValue))) {
            onChange(`${numericValue}${unit}`);
        } else {
            setNumericValue('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setNumericValue(value);
        }
    };

    const handleUnitChange = (newUnit: string) => {
        setUnit(newUnit);
        onChange(`${numericValue}${newUnit}`);
    };

    return (
        <div
            className={cn('flex items-center w-full gap-2 border border-background hover:border-foreground/50 bg-background p-1 rounded-md text-muted-foreground hover:text-foreground px-2', {
                "border-foreground/50 text-foreground": focus
            })}
        >
            <input
                ref={inputRef}
                value={numericValue}
                disabled={disabled}
                onChange={handleChange}
                className={'w-full flex-1 outline-none border-0 bg-none bg-inherit'}
                onFocus={() => {
                    setFocus(true);
                    inputRef.current?.select();
                }}
                onBlur={handleBlur}
                aria-label="Measurement input"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={'text-muted-foreground my-auto'}>{unit}</button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Units</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    {['px', 'rem', 'em', '%'].map(u => (
                        <DropdownMenuCheckboxItem
                            key={u}
                            checked={unit === u}
                            onCheckedChange={() => handleUnitChange(u)}
                        >
                            {u}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}