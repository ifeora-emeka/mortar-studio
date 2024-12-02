import LeftPanelToggler from "./layout/left-panels/LeftPanelToggler";
import LeftPanel from "./layout/left-panels/LeftPanel";
import RightPanelToggler from "./layout/right-panels/RightPanelToggler";
import RightPanels from "./layout/right-panels/RightPanels";
import DesignerPreview from "./layout/DesignerPreview";
import DesignerHeader
    from "@/components/builder/designer/layout/header/DesignerHeader.tsx";
import {DesignerProvider} from "@/__mock__/TestDesginerContext.tsx";

export default function Designer() {
    return <>
        <div className={'min-h-screen max-h-screen overflow-hidden flex flex-col'}>
            <DesignerHeader/>
            <main className="min-h-[--body-height] max-h-[--body-height] flex">
                <LeftPanelToggler/>
                <LeftPanel/>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*// @ts-expect-error */}
                <DesignerProvider>
                    <DesignerPreview/>
                    <RightPanels/>
                </DesignerProvider>
                <RightPanelToggler/>
            </main>
        </div>
    </>
}
