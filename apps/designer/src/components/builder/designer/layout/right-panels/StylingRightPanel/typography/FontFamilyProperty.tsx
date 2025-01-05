'use client'

import * as React from "react";
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import { usePreviewContext } from "@/components/builder/context/preview.context";

export default function FontFamilyProperty() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [search, setSearch] = React.useState("");
    const { state } = usePreviewContext();
    const fonts = state.fonts.map(font => ({ value: font.family, label: font.family }));

    const filteredFonts = React.useMemo(() => {
        return fonts
            .filter(font => font.label.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 30);
    }, [fonts, search]);

    return (
        <PropertySection
            label="Font family"
            onVariableConnect={() => {}}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full h-[2rem] justify-between text-muted-foreground hover:text-foreground px-sm"
                    >
                        {value || "Select font..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[20rem] p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search font..."
                            value={search}
                            onValueChange={setSearch}
                        />
                        <CommandList>
                            <CommandEmpty>No fonts found</CommandEmpty>
                            <CommandGroup>
                                {filteredFonts.map((font) => (
                                    <CommandItem
                                        key={font.value}
                                        value={font.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === font.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {font.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </PropertySection>
    );
}

