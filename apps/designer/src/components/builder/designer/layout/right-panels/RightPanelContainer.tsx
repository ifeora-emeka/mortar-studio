import { cn } from "@/lib/utils";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export default function RightPanelContainer({ show, children, headerComponent, label }: { show?: boolean; children: React.ReactNode; headerComponent?: React.ReactNode; label?: string }) {
    return (
        <>
            <aside className={cn("bg-card border-l min-h-[--body-height] max-h-[--body-height] z-0 w-[--panel-width]  transition-all duration-300", {
                "right-0 relative": show,
                "right-[-25rem] fixed": !show
            })}>
                <div className={'max-h-[--body-height] h-[--body-height]'}>
                    <header className={'h-header border-b flex items-center justify-between px-sm gap-default'}>
                        {label && <span>{label}</span>}
                        {headerComponent}
                    </header>
                    <ScrollArea className={'h-[calc(var(--body-height)-var(--header-height))]'}>
                        {children}
                    </ScrollArea>
                </div>
            </aside>
        </>
    )
}
