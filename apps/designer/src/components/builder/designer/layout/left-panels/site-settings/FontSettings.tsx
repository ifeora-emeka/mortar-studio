import LeftPanelSubContainer
    from "@/components/builder/designer/layout/left-panels/LeftPanelSubContainer.tsx";

export default function FontSettings({show}:{show:boolean}) {
    return <>
        <LeftPanelSubContainer show={show}>
            <div className="flex flex-col">
                fonts
            </div>
        </LeftPanelSubContainer>
    </>
}
