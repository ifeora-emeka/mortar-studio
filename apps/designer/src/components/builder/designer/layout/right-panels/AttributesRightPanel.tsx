import { useRightPanelContext } from "../../context/right-panel.context";
import RightPanelContainer from "./RightPanelContainer";

export default function AttributesRightPanel() {
    const { state: { activePanel } } = useRightPanelContext();
    return (
        <RightPanelContainer show={activePanel == 'attributes'}>
            <div>AttributesRightPanel</div>
        </RightPanelContainer>
    )
}
