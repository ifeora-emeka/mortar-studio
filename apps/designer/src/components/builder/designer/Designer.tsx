import { Upload } from "lucide-react";
import { Button } from "../../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import LeftPanelToggler from "./layout/left-panels/LeftPanelToggler";
import LeftPanel from "./layout/left-panels/LeftPanel";
import RightPanelToggler from "./layout/right-panels/RightPanelToggler";
import RightPanels from "./layout/right-panels/RightPanels";

export default function Designer() {
    return <>
        <div className={'min-h-screen max-h-screen overflow-hidden flex flex-col'}>
            <header className="bg-card border-b h-header flex justify-between items-center px-default z-[1000]">
                <h1 className="text-2xl font-bold">Mortar Studio</h1>
                <Button><Upload /> Push</Button>
            </header>
            <main className="min-h-[--body-height] max-h-[--body-height] flex">
                <LeftPanelToggler />
                <LeftPanel />
                <ScrollArea className="flex-1 overflow-y-auto z-0">
                    <img src="https://cdn.dribbble.com/userupload/16139771/file/original-2b8a7f77c58ec642087fb45c042f2dc2.png?resize=1024x3712&vertical=center" alt="preview" className="w-full" />
                </ScrollArea>
                <RightPanels />
                
                <RightPanelToggler />
            </main>
        </div>
    </>
}
