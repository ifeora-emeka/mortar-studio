import { TooltipProvider } from "../ui/tooltip";
import { LeftPanelProvider } from "./designer/context/left-panel.context";
import { RightPanelProvider } from "./designer/context/right-panel.context";
import Designer from "./designer/Designer";

export default function Builder() {
    return <>
        <div className={'min-h-screen max-h-screen overflow-hidden select-none'}>
            <TooltipProvider>
                <LeftPanelProvider>
                    <RightPanelProvider>
                        <Designer />
                    </RightPanelProvider>
                </LeftPanelProvider>
            </TooltipProvider>
        </div>
    </>
}
