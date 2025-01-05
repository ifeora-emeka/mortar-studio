import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import { useElementStyle } from "@/components/builder/hooks/style.hook";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal, AlignJustify, AlignHorizontalSpaceBetween, AlignHorizontalSpaceAround } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function JustifyContentProperty() {
    const { value, handleSave, variable } = useElementStyle("$justifyContent");

    const options = [
        { label: 'Start', value: 'justify-start', icon: AlignStartHorizontal },
        { label: 'Center', value: 'justify-center', icon: AlignCenterHorizontal },
        { label: 'End', value: 'justify-end', icon: AlignEndHorizontal },
        { label: 'Space Between', value: 'justify-between', icon: AlignHorizontalSpaceBetween },
        { label: 'Space Around', value: 'justify-around', icon: AlignHorizontalSpaceAround },
        { label: 'Space Evenly', value: 'justify-evenly', icon: AlignJustify },
    ];

    return (
        <PropertySection
            label="Justify Content"
            variable={variable}
        >
            <ToggleGroup
                className="border border-input rounded-lg bg-background justify-between flex-wrap"
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
                                    aria-label={`Justify content ${label}`}
                                    className={cn(
                                        "p-2 border hover:text-foreground",
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

