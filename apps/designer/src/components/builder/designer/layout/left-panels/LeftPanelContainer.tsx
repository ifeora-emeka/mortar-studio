import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area"
import {cn} from "@/lib/utils";
import React, {useEffect} from "react"
import {useLeftPanelContext} from "@/components/builder/context/left-panel.context.tsx";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";


export default function LeftPanelContainer({children, show, headerChildren, onAdd}: {
    children: React.ReactNode;
    show?: boolean;
    headerChildren?: React.ReactNode,
    onAdd?: () => void
}) {
    const {state: {activePanel}} = useLeftPanelContext();
    const [ready, setReady] = React.useState(false);


    useEffect(() => {
        if (!show) {
            setTimeout(() => {
                setReady(false);
            }, 300);
        } else {
            setReady(true);
        }
    }, [show]);

    return (
        <>
            <aside
                className={cn("bg-card border-r min-h-[--body-height] max-h-[--body-height] fixed z-40 w-[--panel-width] shadow-xl transition-all duration-300", {
                    "left-header": show,
                    "left-[-20rem]": !show
                })}>
                {ready && <header
                    className="h-header max-h-header border-b flex items-center px-sm gap-default">
                    <div className="flex-1">
                        <Input placeholder={`Search ${activePanel}...`}
                               className={'bg-accent hover:shadow-sm'}/>
                    </div>
                    {
                        onAdd &&
                        <Button variant={'outline'} size={'icon'} onClick={onAdd}>
                            <Plus/>
                        </Button>
                    }
                    {headerChildren}
                </header>}
                <ScrollArea
                    className="h-[--side-bar-body-height] max-h-[--side-bar-body-height] bg-card">
                    {ready ? children : null}
                </ScrollArea>
            </aside>
        </>
    )
}