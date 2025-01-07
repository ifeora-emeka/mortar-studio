import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useElementStyle } from "@/components/builder/hooks/style.hook";

export default function BorderStyleProperty() {
    const { value, handleSave, variable } = useElementStyle("$borderStyle");

    const borderStyles = [
        { value: "border-none", label: "None" },
        { value: "border-solid", label: "Solid" },
        { value: "border-dashed", label: "Dashed" },
        { value: "border-dotted", label: "Dotted" },
        { value: "border-double", label: "Double" },
        { value: "border-groove", label: "Groove" },
        { value: "border-ridge", label: "Ridge" },
        { value: "border-inset", label: "Inset" },
        { value: "border-outset", label: "Outset" },
    ];

    return (
        <PropertySection label="Border Style" onVariableConnect={handleSave} variable={variable}>
            <Select value={value} onValueChange={handleSave}>
                <SelectTrigger className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                    {borderStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                            {style.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </PropertySection>
    );
}

