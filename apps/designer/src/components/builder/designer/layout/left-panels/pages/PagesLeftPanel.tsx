import {File, Pencil} from "lucide-react";
import {useLeftPanelContext} from "@/components/builder/context/left-panel.context.tsx";
import LeftPanelContainer from "../LeftPanelContainer.tsx";
import {cn} from "@/lib/utils.ts";
import {MortarPage} from '@repo/common/schema/page'
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import CreatePageModel
    from "@/components/builder/designer/layout/left-panels/pages/CreatePageModal.tsx";
import {useState} from "react";

export default function PagesLeftPanel() {
    const {state: {activePanel}} = useLeftPanelContext();
    const {state: {pages, activePage}, setPreviewState} = usePreviewContext();
    const [showAdd, setShowAdd] = useState(false);

    return (
        <>
            <CreatePageModel open={showAdd} setOpen={(e) => setShowAdd(e)}/>
            <LeftPanelContainer show={activePanel == 'pages'}
                                onAdd={() => setShowAdd(true)}>
                <div className="flex flex-col gap-sm p-sm">
                    {
                        pages.map((page) => (
                            <EachPage
                                key={page.id}
                                page={page}
                                active={(activePage && activePage.id === page.id) as boolean}
                                onClick={() => setPreviewState({
                                    activePage: page
                                })}
                            />
                        ))
                    }
                </div>
            </LeftPanelContainer>
        </>
    )
}

const EachPage = ({active, page, onClick}: {
    active?: boolean;
    page: MortarPage,
    onClick: () => void;
}) => {
    return <div
        onClick={onClick}
        className={cn("p-default hover:bg-accent border rounded-lg flex items-center gap-default group cursor-pointer", {
            "bg-accent": active
        })}>
        <div className="text-muted-foreground group-hover:text-foreground">
            <File/>
        </div>
        <div className="flex flex-col gap-1 flex-1">
            <p>{page.title}</p>
            <small className='text-muted-foreground'>{page.route}</small>
        </div>
        <button
            className="group-hover:opacity-100 opacity-0 text-muted-foreground hover:text-foreground transition-opacity duration-300">
            <Pencil className="h-5 w-5"/>
        </button>
    </div>
}
