import PropertySection from "@/components/builder/designer/layout/right-panels/PropertySection";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useElementStyle } from "@/components/builder/hooks/style.hook";

export default function FontWeightProperty() {
    const { value, handleSave, variable } = useElementStyle("fontWeight");

    const fontWeights = [
        { value: "100", label: "Thin (100)" },
        { value: "200", label: "Extra Light (200)" },
        { value: "300", label: "Light (300)" },
        { value: "400", label: "Normal (400)" },
        { value: "500", label: "Medium (500)" },
        { value: "600", label: "Semi Bold (600)" },
        { value: "700", label: "Bold (700)" },
        { value: "800", label: "Extra Bold (800)" },
        { value: "900", label: "Black (900)" },
        { value: "normal", label: "Normal" },
        { value: "inherit", label: "Inherit" },
    ];

    return (
        <PropertySection label="Font weight" onVariableConnect={handleSave} variable={variable}>
            <Select value={value} onValueChange={handleSave}>
                <SelectTrigger className="w-full border border-input bg-background hover:bg-accent">
                    <SelectValue placeholder="Select font weight" />
                </SelectTrigger>
                <SelectContent>
                    {fontWeights.map((weight) => (
                        <SelectItem key={weight.value} value={weight.value}>
                            {weight.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </PropertySection>
    );
}

