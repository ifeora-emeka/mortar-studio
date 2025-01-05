import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import { useElementStyle } from "@/components/builder/hooks/style.hook";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
    ArrowDownToLine,
    ArrowUpDown, Eye,
    EyeOff,
} from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function OverflowProperty() {
    const { value, handleSave, variable } = useElementStyle("$overflow");

    const options = [
        { label: 'Hidden', value: 'overflow-hidden', icon: EyeOff },
        { label: 'Auto', value: 'overflow-auto', icon: ArrowUpDown },
        { label: 'Scroll', value: 'overflow-scroll', icon: ArrowDownToLine },
        { label: 'Visible', value: 'overflow-visible', icon: Eye },
    ];

    return (
        <PropertySection
            label="Overflow"
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
                                    aria-label={`Set overflow to ${label}`}
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

