import { Upload } from "lucide-react";
import { Button } from "../../ui/button";
import LeftPanelToggler from "./layout/left-panels/LeftPanelToggler";
import LeftPanel from "./layout/left-panels/LeftPanel";
import RightPanelToggler from "./layout/right-panels/RightPanelToggler";
import RightPanels from "./layout/right-panels/RightPanels";
import DesignerPreview from "./layout/DesignerPreview";

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
                <DesignerPreview />
                <RightPanels />
                <RightPanelToggler />
            </main>
        </div>
    </>
}
