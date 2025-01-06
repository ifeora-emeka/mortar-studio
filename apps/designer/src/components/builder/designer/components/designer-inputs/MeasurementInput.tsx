import {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {DesignerInputProps} from '@repo/common/types/input';
import VariableSelectorDropdown
    from "@/components/builder/designer/components/VariableSelectorDropdown";

export default function MeasurementInput(
    {
        value,
        onChange,
        onBlur,
        disabled,
        variable
    }: DesignerInputProps) {
    const [focus, setFocus] = useState(false);
    const [numericValue, setNumericValue] = useState('');
    const [unit, setUnit] = useState('px');
    const inputRef = useRef<HTMLInputElement>(null);
    const isDisabled = disabled || variable ? true : false;

    useEffect(() => {
        const match = value.match(/^(-?\d*\.?\d+)([a-z%]*)$/);
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
        updateValue();
    };

    const updateValue = () => {
        if (!isNaN(parseFloat(numericValue))) {
            onChange(`${numericValue}${unit}`);
        } else {
            setNumericValue('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^-?\d*\.?\d*$/.test(value)) {
            setNumericValue(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateValue();
        }
    };

    const handleUnitChange = (newUnit: string) => {
        setUnit(newUnit);
        onChange(`${numericValue}${newUnit}`);
    };

    return (
        <>
            <VariableSelectorDropdown onChange={onChange} disabled={!variable}>
                <div
                    className={cn('flex items-center w-full gap-2 border border-input bg-background hover:bg-accent p-1 h-[35px] rounded-lg text-muted-foreground px-2', {
                        "text-foreground": focus,
                        "hover:text-foreground": !disabled,
                        "cursor-pointer": isDisabled
                    })}
                >
                    {
                        !variable ? (
                            <input
                                ref={inputRef}
                                value={numericValue}
                                disabled={isDisabled}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                className={'w-full flex-1 outline-none border-0 bg-none bg-inherit'}
                                onFocus={() => {
                                    setFocus(true);
                                    inputRef.current?.select();
                                }}
                                onBlur={handleBlur}
                                aria-label="Measurement input"
                            />
                        ) : (
                            <span
                                className={'w-full flex-1 outline-none border-0 bg-none bg-inherit truncate'}>
                {variable.name}
              </span>
                        )
                    }
                    {
                        !variable && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild disabled={isDisabled}>
                                    <button
                                        disabled={isDisabled}
                                        className={'text-muted-foreground my-auto'}
                                    >
                                        {unit}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Units</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    {['px', 'rem', 'em', '%', 'vw', 'vh'].map(u => (
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
                        )
                    }
                </div>
            </VariableSelectorDropdown>
        </>
    );
}

