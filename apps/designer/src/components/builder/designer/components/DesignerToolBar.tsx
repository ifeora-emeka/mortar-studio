import React from "react";
import Draggable from "react-draggable";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    ArrowLeft,
    ArrowRight,
    CaseSensitive,
    PaintBucket,
    Plus
} from "lucide-react";

export default function DesignerToolBar() {
    return (
        <Draggable>
            <div className={'p-[30px] left-1/2 transform -translate-x-1/2 cursor-move fixed bottom-default'}>
                <div
                    className={
                        "flex gap-default z-50 bg-card shadow-xl border rounded-lg p-sm   "
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
                    <EachTool tooltip={"Add"}>
                        <Plus/>
                    </EachTool>
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
                <button
                    className={
                        "border text-muted-foreground p-sm rounded-lg hover:bg-accent hover:text-foreground [&>svg]:size-4"
                    }
                >
                    {children}
                </button>
            </TooltipTrigger>
            <TooltipContent className={"mb-3"}>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};
