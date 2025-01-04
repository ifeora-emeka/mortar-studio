import {Label} from "@/components/ui/label.tsx";
import {LayoutGrid} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import VariableSelectorDropdown
    from "@/components/builder/designer/components/VariableSelectorDropdown.tsx";


type Props = {
    label: string;
    children: React.ReactNode;
    onVariableConnect: (value:string) => void;
}
export default function PropertySection({label, children, onVariableConnect}: Props) {
    return <>
        <div className={'space-y-sm'}>
            <div className={'flex justify-between items-center'}>
                <Label className={'text-muted-foreground'}>{label}</Label>
                <div className={'space-x-sm'}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <VariableSelectorDropdown onChange={onVariableConnect}>
                                <button
                                    className={'text-muted-foreground hover:text-foreground'}
                                >
                                    <LayoutGrid className={'h-3 w-3'}/>
                                </button>
                            </VariableSelectorDropdown>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Link a variable</p>
                        </TooltipContent>
                    </Tooltip>

                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    </>
}
