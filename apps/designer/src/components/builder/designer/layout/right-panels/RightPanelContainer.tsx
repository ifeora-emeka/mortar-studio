import { cn } from "@/lib/utils";

export default function RightPanelContainer({ show, children }: { show?: boolean; children: React.ReactNode }) {
    return (
        <>
            <aside className={cn("bg-card border-l min-h-[--body-height] max-h-[--body-height] z-40 w-[--panel-width]  transition-all duration-300", {
                "right-0 relative": show,
                "right-[-25rem] fixed": !show
            })}>
                {children}
            </aside>
        </>
    )
}
