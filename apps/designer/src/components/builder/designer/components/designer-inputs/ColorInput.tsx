import {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx"
import ColorPicker from 'react-pick-color';
import colorString from 'color-string';
import {DesignerInputProps} from '@repo/common/types/input';
import VariableSelectorDropdown
    from "@/components/builder/designer/components/VariableSelectorDropdown.tsx";

export default function ColorInput(
    {
        onChange,
        value,
        debounceDelay = 300,
        onBlur,
        disabled,
        variable
    }: DesignerInputProps) {
    const [focus, setFocus] = useState(false);
    const [data, setData] = useState(value);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setData(value);
    }, [value]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (data !== value && colorString.get(data)) {
                onChange(data);
            }
        }, debounceDelay);

        return () => {
            clearTimeout(handler);
        };
    }, [data, onChange, value, debounceDelay]);

    const handleBlur = () => {
        setFocus(false);
        if (onBlur) {
            onBlur();
        }
        if (data !== value) {
            if (colorString.get(data)) {
                onChange(data);
            } else {
                setData(value);
            }
        }
    };

    return (
        <>
            <VariableSelectorDropdown onChange={onChange} disabled={!variable}>
                <div
                    className={cn('flex items-center w-full gap-2 border border-input hover:bg-accent bg-background p-1 rounded-md text-muted-foreground hover:text-foreground', {
                        "border-foreground/50 text-foreground": focus,
                        "cursor-pointer": variable
                    })}>
                    <Popover
                        open={popoverOpen}
                        onOpenChange={(isOpen) => {
                            setPopoverOpen(isOpen);
                            if (onBlur && !isOpen) {
                                handleBlur();
                            }
                        }}
                    >
                        <PopoverTrigger asChild disabled={!!variable}>
                            <button
                                className={'min-h-5 min-w-5 rounded-sm hover:shadow-lg'}
                                style={{backgroundColor: value || "#0000"}}
                                aria-label="Color picker"
                                role="button"
                                tabIndex={0}
                            />
                        </PopoverTrigger>
                        {
                            !disabled && <PopoverContent
                                className={'flex items-center justify-center py-1'}>
                                <ColorPicker
                                    theme={{
                                        background: 'none',
                                        inputBackground: 'hsl(var(--background))',
                                        borderColor: 'none',
                                        borderRadius: '8px',
                                        color: 'hsl(var(----foreground))',
                                        width: '300px'
                                    }}
                                    color={data}
                                    onChange={e => {
                                        setData(e.hex);
                                    }}
                                />
                            </PopoverContent>
                        }
                    </Popover>

                    {
                        !variable ? <input
                            ref={inputRef}
                            value={data}
                            disabled={disabled}
                            onChange={e => setData(e.target.value)}
                            className={'outline-none border-0 w-full bg-inherit bg-none'}
                            onFocus={() => {
                                setFocus(true);
                                inputRef.current?.select();
                            }}
                            onBlur={handleBlur}
                            aria-label="Color input"
                        /> : <span>
                    {variable.name}
                </span>
                    }
                </div>
            </VariableSelectorDropdown>
        </>
    );
}