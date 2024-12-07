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
    Plus,
    Trash
} from "lucide-react";
import ToolBarAddOptions
    from "@/components/builder/designer/components/DesignerToolBar/ToolBarAddOptions.tsx";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";

export default function DesignerToolBar() {
    const { deleteElement, incrementElementIndex, decrementElementIndex, duplicateElement } = useElement();
    const { state: { activeElements } } = usePreviewContext();

    const handleDelete = () => {
        if (activeElements.length > 0) {
            deleteElement(activeElements[0].id);
        }
    };

    const handleDuplicate = () => {
        if (activeElements.length > 0) {
            duplicateElement(activeElements[0]);
        }
    };

    const handleMoveLeft = () => {
        if (activeElements.length > 0) {
            decrementElementIndex(activeElements[0].id);
        }
    };

    const handleMoveRight = () => {
        if (activeElements.length > 0) {
            incrementElementIndex(activeElements[0].id);
        }
    };

    return (
        <Draggable>
            <div
                className={'p-[30px] left-1/2 transform -translate-x-1/2 cursor-move fixed bottom-default group transition-opacity duration-300'}>
                <div
                    className={
                        "flex gap-sm z-50 bg-card shadow-xl border rounded-lg p-sm"
                    }
                >
                    <EachTool tooltip={"Move left"} onClick={handleMoveLeft}>
                        <ArrowLeft/>
                    </EachTool>
                    <EachTool tooltip={"Move right"} onClick={handleMoveRight}>
                        <ArrowRight/>
                    </EachTool>
                    <EachTool tooltip={"Background color"}>
                        <PaintBucket/>
                    </EachTool>
                    <EachTool tooltip={"Text color"}>
                        <CaseSensitive/>
                    </EachTool>
                    <EachTool tooltip={"Duplicate"} onClick={handleDuplicate}>
                        <Copy/>
                    </EachTool>
                    <EachTool tooltip={"Delete"} onClick={handleDelete}>
                        <Trash/>
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

const EachTool = ({children, tooltip, onClick}: {
    children: React.ReactNode;
    tooltip: string;
    onClick?: () => void;
}) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className={"p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground [&>svg]:size-4 text-xl"}
                    onClick={onClick}
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