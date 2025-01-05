import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import { useElementStyle } from "@/components/builder/hooks/style.hook";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlignStartVertical, AlignCenterVertical, AlignEndVertical, StretchVertical, Baseline } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AlignItemsProperty() {
    const { value, handleSave, variable } = useElementStyle("$alignItems");

    const options = [
        { label: 'Start', value: 'items-start', icon: AlignStartVertical },
        { label: 'Center', value: 'items-center', icon: AlignCenterVertical },
        { label: 'End', value: 'items-end', icon: AlignEndVertical },
        { label: 'Stretch', value: 'items-stretch', icon: StretchVertical },
        { label: 'Baseline', value: 'items-baseline', icon: Baseline },
    ];

    return (
        <PropertySection
            label="Align Items"
            variable={variable}
        >
            <ToggleGroup
                className="border border-input rounded-lg bg-background justify-between"
                type="single"
                value={value}
                onValueChange={(newValue) => {
                    if (newValue) handleSave(newValue);
                }}
            >
                {options.map(({ label, value: optionValue, icon: Icon }) => (
                    <TooltipProvider key={optionValue}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <ToggleGroupItem
                                    value={optionValue}
                                    aria-label={`Align items ${label}`}
                                    className={cn(
                                        "p-2 border w-full hover:text-foreground",
                                        value === optionValue ? "text-foreground bg-accent shadow-sm" : "text-muted-foreground border-background"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                </ToggleGroupItem>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </ToggleGroup>
        </PropertySection>
    );
}

