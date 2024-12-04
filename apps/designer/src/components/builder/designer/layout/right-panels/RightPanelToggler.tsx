import { ChevronLeft, Cpu, DraftingCompass, Settings2, SwatchBook } from "lucide-react";
import EachToggleBtn from "../EachToggleBtn";
import { useRightPanelContext } from "@/components/builder/context/right-panel.context";

export default function RightPanelToggler() {
    const { state: { activePanel }, toggleRightPanel } = useRightPanelContext();
    return (
        <>
            <div className="w-header h-full min-h-[--body-height] max-h-[--body-height] border-l z-[1000] bg-card flex flex-col justify-between">
                <div>
                    <EachToggleBtn onClick={() => toggleRightPanel('styling')} alignTooltip="left" tooltip="Styling" active={activePanel == 'styling'}>
                        <SwatchBook />
                    </EachToggleBtn>
                    <EachToggleBtn onClick={() => toggleRightPanel('attributes')} alignTooltip="left" tooltip="Attributes" active={activePanel == 'attributes'}>
                        <Settings2 />
                    </EachToggleBtn>
                    <EachToggleBtn onClick={() => toggleRightPanel('custom-properties')} alignTooltip="left" tooltip="Custom properties" active={activePanel == 'custom-properties'}>
                        <Cpu />
                    </EachToggleBtn>
                    <EachToggleBtn onClick={() => toggleRightPanel('state')} alignTooltip="left" tooltip="Manage state" active={activePanel == 'state'}>
                        <DraftingCompass />
                    </EachToggleBtn>
                </div>
                <div>
                    <EachToggleBtn onClick={() => {}} alignTooltip="left" tooltip="Toggle panel">
                        <ChevronLeft />
                    </EachToggleBtn>
                </div>
            </div>
        </>
    )
}
