import LeftPanelToggler from "./layout/left-panels/LeftPanelToggler";
import LeftPanel from "./layout/left-panels/LeftPanel";
import RightPanelToggler from "./layout/right-panels/RightPanelToggler";
import RightPanels from "./layout/right-panels/RightPanels";
import DesignerHeader
    from "@/components/builder/designer/layout/header/DesignerHeader.tsx";
import {lazy} from "react";

const DesignerPreview = lazy(() => import("./layout/DesignerPreview/DesignerPreview.tsx"));

export default function Designer() {
    return <>
        <div className={'min-h-screen max-h-screen overflow-hidden flex flex-col'}>
            <DesignerHeader/>
            <main className="min-h-[--body-height] max-h-[--body-height] flex">
                <LeftPanelToggler/>
                <LeftPanel/>
                <DesignerPreview/>
                <RightPanels/>
                <RightPanelToggler/>
            </main>
        </div>
    </>
}
