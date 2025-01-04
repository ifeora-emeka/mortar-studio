import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {Search} from "lucide-react";
import {MortarVariable} from "@repo/common/schema/variables";
import {outputVariableRef} from "@repo/common/utils";

export default function VariableSelectorDropdown({children, onChange, disabled}: {
    children: React.ReactNode;
    onChange: (value: string) => void;
    disabled?:boolean;
}) {
    const {state: {variables, variableSets}} = usePreviewContext();
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger disabled={disabled} asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'p-sm'}>
                <div className={'h-[20rem] max-h-[20rem] w-[20rem] space-y-sm'}>
                    <header
                        className={'h-[calc(2.5rem)] border rounded-xl flex items-center gap-sm px-sm'}>
                        <Search className={'text-muted-foreground h-6 w-6'}/>
                        <input
                            className={'flex-1 bg-none bg-inherit border-none outline-none'}
                            placeholder={'Search for variables...'}
                            autoFocus
                        />
                    </header>
                    <div
                        className={'max-h-[calc(20rem-3rem)] overflow-y-auto overflow-x-hidden flex flex-col'}>
                        {
                            variableSets.map((variableSet, index) => {
                                return <div key={index}>
                                    <DropdownMenuLabel>{variableSet.name}</DropdownMenuLabel>
                                    {
                                        variables.filter(x => x.setID == variableSet.id).map((variable, index) => (
                                            <DropdownMenuItem
                                                key={index}
                                                onClick={() => onChange(outputVariableRef({
                                                    type: 'variables',
                                                    id: variable.id
                                                }))}
                                            >
                                                <RenderVariable variable={variable}/>
                                            </DropdownMenuItem>
                                        ))
                                    }
                                    <DropdownMenuSeparator/>
                                </div>
                            })
                        }
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>

    </>
}

const RenderVariable = ({variable}: { variable: MortarVariable }) => {
    return <div className={'flex items-center'}>
        <div className={'flex items-center gap-sm'}>
            {
                variable.type == 'color' && <div
                    className={'h-5 w-5 rounded-full'}
                    style={{backgroundColor: variable.lightValue}}
                />
            }
            {
                variable.type == 'measurement' &&
                <span className={'text-muted-foreground'}>{variable.lightValue}</span>
            }
            <span>{variable.name}</span>
        </div>
    </div>
}
