import React from "react";
import Draggable from "react-draggable";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import {
    ArrowLeft,
    ArrowRight,
    CaseSensitive, Copy,
    PaintBucket,
    Plus
} from "lucide-react";
import ToolBarAddOptions
    from "@/components/builder/designer/components/DesignerToolBar/ToolBarAddOptions.tsx";


export default function DesignerToolBar() {
    return (
        <Draggable>
            <div
                className={'p-[30px] left-1/2 transform -translate-x-1/2 cursor-move fixed bottom-default group transition-opacity duration-300'}>
                <div
                    className={
                        "flex gap-sm z-50 bg-card shadow-xl border rounded-lg p-sm   "
                    }
                >
                    <EachTool tooltip={"Move left"}>
                        <ArrowLeft/>
                    </EachTool>
                    <EachTool tooltip={"Move right"}>
                        <ArrowRight/>
                    </EachTool>
                    <EachTool tooltip={"Background color"}>
                        <PaintBucket/>
                    </EachTool>
                    <EachTool tooltip={"Text color"}>
                        <CaseSensitive/>
                    </EachTool>
                    <EachTool tooltip={"Duplicate"}>
                        <Copy/>
                    </EachTool>
                    <ToolBarAddOptions>
                        <EachTool tooltip={"Add"}>
                            <Plus/>
                        </EachTool>
                    </ToolBarAddOptions>
                </div>
            </div>
        </Draggable>
    );
}

const EachTool = ({children, tooltip}: {
    children: React.ReactNode;
    tooltip: string
}) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={
                        "border text-muted-foreground p-sm rounded-lg hover:bg-accent hover:text-foreground [&>svg]:size-4"
                    }
                >
                    {children}
                </div>
            </TooltipTrigger>
            <TooltipContent className={"mb-3"}>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};
