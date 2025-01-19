import {cn} from "@/lib/utils.ts";
import {DesignerInputProps} from "@repo/common/types/input";
import {useState} from "react";

export default function FileSelectorInput(
    {
        variable, value,
        onChange
    }: DesignerInputProps) {
    const [focus, setFocus] = useState(false);
    const [data, setData] = useState(value);

    return <>
        <button
            className={cn('flex items-center w-full gap-2 border border-input hover:bg-accent bg-background p-1 h-[35px] rounded-md text-muted-foreground hover:text-foreground', {
                "border-foreground/50 text-foreground": focus,
                "cursor-pointer": variable
            })}
        >
            <div className={'min-h-6 min-w-6 rounded-sm hover:shadow-lg bg-black'}>

            </div>
            <div>
                <input onChange={e => onChange(e.target.value)} placeholder={'Select file or enter url'} className={'w-full outline-none border-none bg-inherit'}/>
            </div>
        </button>
    </>
}
