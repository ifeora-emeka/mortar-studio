import ComponentsLeftPanel from "./ComponentsLeftPanel";
import PagesLeftPanel from "./pages/PagesLeftPanel.tsx";
import VariablePanel
    from "@/components/builder/designer/layout/left-panels/VariablesPanel/VariablesPanel.tsx";
import LayersPanel
    from "@/components/builder/designer/layout/left-panels/LayerPanel/LayersPanel.tsx";

export default function LeftPanel() {
    return (
        <>
            <PagesLeftPanel />
            <ComponentsLeftPanel />
            <VariablePanel />
            <LayersPanel />
        </>
    )
}
