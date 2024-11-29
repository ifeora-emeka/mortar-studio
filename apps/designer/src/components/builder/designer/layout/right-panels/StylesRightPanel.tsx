import { useRightPanelContext } from "../../context/right-panel.context";
import RightPanelContainer from "./RightPanelContainer";

export default function StylesRightPanel() {
    const { state: { activePanel } } = useRightPanelContext();
    return (
        <RightPanelContainer show={activePanel == 'styling'}>
            <div>StylesRightPanel</div>
        </RightPanelContainer>
    )
}
