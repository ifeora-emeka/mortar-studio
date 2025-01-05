import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import { useElementStyle } from "@/components/builder/hooks/style.hook";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
    Ban,
    Grid2x2,
    SquareDashed,
    StretchVertical
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function DisplayProperty() {
    const { value, handleSave, variable } = useElementStyle("$display");

    const options = [
        { label: 'Block', value: 'block', icon: SquareDashed },
        { label: 'Flex', value: 'flex', icon: StretchVertical },
        { label: 'Grid', value: 'grid', icon: Grid2x2 },
        { label: 'None', value: 'hidden', icon: Ban },
    ];

    return (
        <PropertySection
            label="Display"
            variable={variable}
        >
            <ToggleGroup
                className={'border border-input rounded-lg bg-background justify-between'}
                type="single"
                value={value}
                onValueChange={(newValue) => {
                    if (newValue) handleSave(newValue);
                }}
            >
                {options.map(({ value: optionValue, icon: Icon, label }) => (
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
                        <span>{label}</span>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </PropertySection>
    );
}

