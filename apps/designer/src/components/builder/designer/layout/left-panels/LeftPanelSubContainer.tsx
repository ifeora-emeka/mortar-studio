import {cn} from "@/lib/utils.ts";

export default function LeftPanelSubContainer({show, children}: {
    show?: boolean;
    children: React.ReactNode
}) {
    return <>
        <div
            className={cn("bg-card border-r min-h-[--body-height] max-h-[--body-height] fixed z-30 w-[calc(var(--panel-width)+var(--panel-width))] shadow-xl transition-all", {
                "left-[-40rem] duration-300": !show,
                "left-[calc(var(--header-height)+var(--panel-width))] duration-500": show
            })}
        >
            {children}
            <div className={'h-52'}/>
        </div>
    </>
}
