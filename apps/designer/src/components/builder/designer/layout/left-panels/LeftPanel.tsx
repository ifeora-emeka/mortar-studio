import ComponentsLeftPanel from "./ComponentsLeftPanel";
import PagesLeftPanel from "./pages/PagesLeftPanel.tsx";
import VariablePanel
    from "@/components/builder/designer/layout/left-panels/VariablesPanel/VariablesPanel.tsx";

export default function LeftPanel() {
    return (
        <>
            <PagesLeftPanel />
            <ComponentsLeftPanel />
            <VariablePanel />
        </>
    )
}
