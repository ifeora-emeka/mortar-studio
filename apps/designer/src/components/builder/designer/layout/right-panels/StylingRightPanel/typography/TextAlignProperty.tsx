import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import { useElementStyle } from "@/components/builder/hooks/style.hook";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function TextAlignProperty() {
    const { value, handleSave, variable } = useElementStyle("$textAlign");

    const alignOptions = [
        { value: 'text-start', icon: AlignLeft },
        { value: 'text-center', icon: AlignCenter },
        { value: 'text-end', icon: AlignRight },
        { value: 'text-justify', icon: AlignJustify },
    ];

    return (
        <PropertySection
            label="Text align"
            variable={variable}
        >
            <ToggleGroup
                className={'border border-input rounded-lg bg-background'}
                type="single"
                value={value}
                onValueChange={(newValue) => {
                    if (newValue) handleSave(newValue);
                }}
            >
                {alignOptions.map(({ value: optionValue, icon: Icon }) => (
                    <ToggleGroupItem
                        key={optionValue}
                        value={optionValue}
                        aria-label={`Align text ${optionValue}`}
                        className={cn(
                            "p-2 border",
                            value === optionValue ? "text-foreground bg-accent shadow-sm" : "text-muted-foreground border-background"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </PropertySection>
    );
}

