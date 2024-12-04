import ComponentsLeftPanel from "./ComponentsLeftPanel";
import PagesLeftPanel from "./PagesLeftPanel";
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
