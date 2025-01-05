import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import { useElementStyle } from "@/components/builder/hooks/style.hook";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
    MoveDown, MoveRight,
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function FlexWrapProperty() {
    const { value, handleSave, variable } = useElementStyle("$flexWrap");

    const options = [
        { label: 'Wrap', value: 'flex-wrap', icon: MoveRight },
        { label: 'No wrap', value: 'flex-nowrap', icon: MoveDown },
    ];

    return (
        <PropertySection
            label="Wrap?"
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
                {options.map(({ value: optionValue, label }) => (
                    <ToggleGroupItem
                        key={optionValue}
                        value={optionValue}
                        aria-label={`Align text ${optionValue}`}
                        className={cn(
                            "p-2 border w-full hover:text-foreground",
                            value === optionValue ? "text-foreground bg-accent shadow-sm" : "text-muted-foreground border-background"
                        )}
                    >
                        {/*<Icon className="h-4 w-4" />*/}
                        <span>{label}</span>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </PropertySection>
    );
}

