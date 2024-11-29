import { TooltipProvider } from "../ui/tooltip";
import Designer from "./designer/Designer";

export default function Builder() {
    return <>
        <div className={'min-h-screen max-h-screen overflow-hidden select-none'}>
            <TooltipProvider>
                <Designer />
            </TooltipProvider>
        </div>
    </>
}
