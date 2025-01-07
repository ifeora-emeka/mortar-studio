import ComponentsLeftPanel from "./ComponentsLeftPanel";
import PagesLeftPanel from "./pages/PagesLeftPanel.tsx";
import VariablePanel
    from "@/components/builder/designer/layout/left-panels/VariablesPanel/VariablesPanel.tsx";
import LayersPanel
    from "@/components/builder/designer/layout/left-panels/LayerPanel/LayersPanel.tsx";
import SiteSettingsPanel
    from "@/components/builder/designer/layout/left-panels/site-settings/SiteSettingsPanel.tsx";
import FilesLeftPanel
    from "@/components/builder/designer/layout/left-panels/files/FilesLeftPanel.tsx";

export default function LeftPanel() {
    return (
        <>
            <FilesLeftPanel />
            <PagesLeftPanel />
            <ComponentsLeftPanel />
            <VariablePanel />
            <LayersPanel />
            <SiteSettingsPanel />
        </>
    )
}
