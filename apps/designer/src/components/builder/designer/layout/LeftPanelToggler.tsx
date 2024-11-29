import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Component, Cuboid, File, Paintbrush, Variable } from "lucide-react"
import React from "react"

export default function LeftPanelToggler() {
    return (
        <>
            <div className="w-header h-full min-h-[--body-height] max-h-[--body-height] z-50 flex flex-col">
                <EachToggleBtn alignTooltip="right" tooltip="Pages">
                    <File />
                </EachToggleBtn>
                <EachToggleBtn alignTooltip="right" tooltip="Components" active>
                    <Component />
                </EachToggleBtn>
                <EachToggleBtn alignTooltip="right" tooltip="Blocks">
                    <Cuboid />
                </EachToggleBtn>
                <EachToggleBtn alignTooltip="right" tooltip="Variables">
                    <Variable />
                </EachToggleBtn>
                <EachToggleBtn alignTooltip="right" tooltip="Styles">
                    <Paintbrush />
                </EachToggleBtn>
            </div>
        </>
    )
}

const EachToggleBtn = ({ children, active, tooltip, alignTooltip }: { children: React.ReactNode; active?: boolean; tooltip: string; alignTooltip?: "top" | "right" | "bottom" | "left" }) => {
    return <>
        <Tooltip>
            <TooltipTrigger asChild>
                <button className={cn("w-full h-header flex justify-center items-center text-muted-foreground border-b border-t border-background", {
                    "bg-card text-foreground border-border": active,
                    "hover:bg-card hover:text-foreground hover:border-border": !active
                })}>
                    {children}
                </button>
            </TooltipTrigger>
            <TooltipContent side={alignTooltip} className="bg-card h-header text-card-foreground flex justify-center items-center rounded-none border-l-0 text-lg left-0 border-b border-t border-r" sideOffset={0}>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>

    </>
}
