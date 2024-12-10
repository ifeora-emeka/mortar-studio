import AttributesRightPanel from "./AttributesRightPanel";
import StylesRightPanel from "./StylingRightPanel/StylesRightPanel.tsx";
import CustomPropsRightPanel
    from "@/components/builder/designer/layout/right-panels/CustomPropsRightPanel/CustomPropsRightPanel.tsx";

export default function RightPanels() {
    return (
        <>
            <AttributesRightPanel/>
            <StylesRightPanel/>
            <CustomPropsRightPanel/>
        </>
    )
}
