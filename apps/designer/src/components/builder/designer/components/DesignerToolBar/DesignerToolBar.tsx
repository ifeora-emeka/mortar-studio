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
    CaseSensitive,
    PaintBucket,
    Plus,
    Trash
} from "lucide-react";
import ToolBarAddOptions
    from "@/components/builder/designer/components/DesignerToolBar/ToolBarAddOptions.tsx";
import {useElement} from "@/components/builder/hooks/element.hook.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";

export default function DesignerToolBar() {
    const { deleteElement, incrementElementIndex, decrementElementIndex } = useElement();
    const { state: { activeElements } } = usePreviewContext();
    const isParent = !activeElements[0]?.parent_element_id;

    const handleDelete = () => {
        if (activeElements.length > 0 && activeElements[0]?.parent_element_id) {
            deleteElement();
        }
    };

    // if(!activeElements[0]) return null;

    return (
        <Draggable>
            <div
                className={'p-[30px] left-1/2 transform -translate-x-1/2 cursor-move fixed bottom-default group transition-opacity duration-300'}>
                <div
                    className={
                        "flex gap-sm z-50 bg-card shadow-xl border rounded-lg p-sm"
                    }
                >
                    {
                        !isParent && <>
                            <EachTool tooltip={"Move left"} onClick={decrementElementIndex}>
                                <ArrowLeft/>
                            </EachTool>
                            <EachTool tooltip={"Move right"} onClick={incrementElementIndex}>
                                <ArrowRight/>
                            </EachTool>
                        </>
                    }
                    <EachTool tooltip={"Background color"}>
                        <PaintBucket/>
                    </EachTool>
                    {
                        !isParent && <>
                            <EachTool tooltip={"Text color"}>
                                <CaseSensitive/>
                            </EachTool>
                            <EachTool tooltip={"Delete"} onClick={handleDelete}>
                                <Trash/>
                            </EachTool>
                        </>
                    }
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