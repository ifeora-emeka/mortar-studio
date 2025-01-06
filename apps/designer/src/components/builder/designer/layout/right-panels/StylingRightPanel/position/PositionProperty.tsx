import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import { useElementStyle } from "@/components/builder/hooks/style.hook";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowDownToLine, ArrowUpToLine, MoveVertical, Pin, PinOff } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function PositionProperty() {
    const { value, handleSave, variable } = useElementStyle("$position");

    const options = [
        { label: 'Static', value: 'static', icon: PinOff },
        { label: 'Relative', value: 'relative', icon: MoveVertical },
        { label: 'Absolute', value: 'absolute', icon: ArrowUpToLine },
        { label: 'Fixed', value: 'fixed', icon: Pin },
        { label: 'Sticky', value: 'sticky', icon: ArrowDownToLine },
    ];

    return (
        <PropertySection
            label="Type"
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
                                    aria-label={`Set position to ${label}`}
                                    className={cn(
                                        "p-2 border w-1/5 hover:text-foreground",
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

