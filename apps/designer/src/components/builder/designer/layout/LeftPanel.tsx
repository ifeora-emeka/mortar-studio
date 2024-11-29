import { ScrollArea } from "@/components/ui/scroll-area"


export default function LeftPanel() {
    return (
        <>
            <aside className="bg-card border-r min-h-[--body-height] max-h-[--body-height] fixed left-header z-40 w-[--panel-width] shadow-xl">
                <header className="h-header max-h-header border-b">

                </header>
                <ScrollArea className="h-[--side-bar-body-height] max-h-[--side-bar-body-height]">
                    {
                        new Array(10).fill(0).map((_, i) => {
                            return <div key={i} className=" border-b">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, enim porro maxime facere cupiditate amet, nostrum sint quis dicta quidem assumenda in ducimus doloribus accusantium magni iste delectus? Quis, sapiente.
                            </div>
                        })
                    }
                </ScrollArea>
            </aside>
        </>
    )
}