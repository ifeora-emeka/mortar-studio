import LeftPanelSubContainer
    from "@/components/builder/designer/layout/left-panels/LeftPanelSubContainer.tsx";

export default function MetadataSettings({show}: { show: boolean }) {
    return <>
        <LeftPanelSubContainer show={show}>
            <div className="flex flex-col">
                Metadata settings
            </div>
        </LeftPanelSubContainer>
    </>
}
