import {Label} from "@/components/ui/label.tsx";
import {Ellipsis, LayoutGrid, Unlink} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import VariableSelectorDropdown
    from "@/components/builder/designer/components/VariableSelectorDropdown.tsx";
import {cn} from "@/lib/utils.ts";
import {MortarVariable} from "@repo/common/schema/variables";


type Props = {
    label: string;
    children: React.ReactNode;
    onVariableConnect?: (value: string) => void;
    variable?: MortarVariable;
}

export default function PropertySection(
    {
        label,
        children,
        onVariableConnect,
        variable,
    }: Props) {
    return <>
        <div className={'space-y-sm mb-default group'}>
            <div className={'flex justify-between items-center'}>
                <Label
                    className={cn('text-muted-foreground', {
                        "dark:text-orange-100 text-orange-400 bg-orange-600/10": variable,
                    })}
                >
                    {label}
                </Label>
                <div className={'space-x-sm'}>
                    {
                        onVariableConnect && <>
                            {
                                variable ? <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => {
                                                if (onVariableConnect) {
                                                    onVariableConnect(variable.lightValue)
                                                }
                                            }}
                                            className={cn('text-muted-foreground hover:text-foreground group-hover:opacity-100 opacity-0', {
                                                'text-orange-100': variable
                                            })}
                                        >
                                            <Unlink className={'h-3 w-3'}/>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Unlink variable</p>
                                    </TooltipContent>
                                </Tooltip> : <Tooltip>
                                    <TooltipTrigger asChild>
                                        <VariableSelectorDropdown
                                            onChange={e => {
                                                if (onVariableConnect) {
                                                    onVariableConnect(e)
                                                }
                                            }}>
                                            <button
                                                className={cn('text-muted-foreground hover:text-foreground group-hover:opacity-100 opacity-0', {
                                                    'text-orange-100': variable
                                                })}
                                            >
                                                <LayoutGrid className={'h-3 w-3'}/>
                                            </button>
                                        </VariableSelectorDropdown>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Link a variable</p>
                                    </TooltipContent>
                                </Tooltip>
                            }
                        </>
                    }
                    <button
                        className={'text-muted-foreground hover:text-foreground group-hover:opacity-100 opacity-0'}>
                        <Ellipsis className={'h-3 w-3'}/>
                    </button>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    </>
}
