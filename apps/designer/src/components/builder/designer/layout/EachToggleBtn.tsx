import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react'

type Props = {
    children: React.ReactNode;
    active?: boolean;
    tooltip: string;
    alignTooltip?: "top" | "right" | "bottom" | "left";
    onClick: () => void;
}

export default function EachToggleBtn({ children, active, tooltip, alignTooltip, onClick }: Props) {
    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className={cn("w-full h-header flex justify-center items-center text-muted-foreground", {
                        "bg-accent text-foreground border-border": active,
                        "hover:bg-accent hover:text-foreground hover:border-border": !active
                    })} onClick={onClick} aria-label={tooltip}>
                        {children}
                    </button>
                </TooltipTrigger>
                <TooltipContent side={alignTooltip} className="bg-card h-header text-card-foreground flex justify-center items-center rounded-none border-l-0 text-lg left-0 border" sideOffset={0}>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>

        </>
    )
}