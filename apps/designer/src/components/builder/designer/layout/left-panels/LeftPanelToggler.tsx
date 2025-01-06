import {
    Component,
    Cuboid,
    File, Folder, Layers2,
    LifeBuoy,
    Logs,
    Settings,
    Settings2,
} from "lucide-react"
import { useLeftPanelContext } from "@/components/builder/context/left-panel.context";
import EachToggleBtn from "../EachToggleBtn";
import {Separator} from "@/components/ui/separator.tsx";

export default function LeftPanelToggler() {
    const { state: { activePanel }, toggleLeftPanel } = useLeftPanelContext();
    return (
        <>
            <div className="w-header h-full min-h-[--body-height] max-h-[--body-height] z-50 flex flex-col justify-between bg-card border-r">
                <div>
                    <EachToggleBtn onClick={() => toggleLeftPanel('pages')} alignTooltip="right" tooltip="Pages" active={activePanel == 'pages'}>
                        <File />
                    </EachToggleBtn>
                    <EachToggleBtn onClick={() => toggleLeftPanel('layers')} alignTooltip="right" tooltip="Layers" active={activePanel == 'layers'}>
                        <Layers2 />
                    </EachToggleBtn>
                    <EachToggleBtn onClick={() => toggleLeftPanel('components')} alignTooltip="right" tooltip="Components" active={activePanel == 'components'}>
                        <Component />
                    </EachToggleBtn>
                    <EachToggleBtn onClick={() => toggleLeftPanel('variables')} alignTooltip="right" tooltip="Variables" active={activePanel == 'variables'}>
                        <Logs />
                    </EachToggleBtn>
                    <EachToggleBtn onClick={() => toggleLeftPanel('files')} alignTooltip="right" tooltip="Files" active={activePanel == 'files'}>
                        <Folder />
                    </EachToggleBtn>
                    <Separator />
                    <EachToggleBtn onClick={() => toggleLeftPanel('blocks')} alignTooltip="right" tooltip="Blocks" active={activePanel == 'blocks'}>
                        <Cuboid />
                    </EachToggleBtn>
                    <EachToggleBtn onClick={() => toggleLeftPanel('settings')} alignTooltip="right" tooltip="Site settings" active={activePanel == 'settings'}>
                        <Settings2 />
                    </EachToggleBtn>
                </div>
                <div>
                    <EachToggleBtn onClick={() => {}} alignTooltip="right" tooltip="Help" >
                        <LifeBuoy />
                    </EachToggleBtn>
                    <EachToggleBtn onClick={() => {}} alignTooltip="right" tooltip="Settings" >
                        <Settings />
                    </EachToggleBtn>
                </div>
            </div>
        </>
    )
}


