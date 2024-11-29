import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils";
import React from "react"


export default function LeftPanelContainer({ children, show }: { children: React.ReactNode; show?: boolean }) {
    return (
        <>
            <aside className={cn("bg-card border-r min-h-[--body-height] max-h-[--body-height] fixed z-40 w-[--panel-width] shadow-xl transition-all duration-300", {
                "left-header": show,
                "left-[-20rem]": !show
            })}>
                <header className="h-header max-h-header border-b">

                </header>
                <ScrollArea className="h-[--side-bar-body-height] max-h-[--side-bar-body-height] bg-background">
                    {children}
                </ScrollArea>
            </aside>
        </>
    )
}