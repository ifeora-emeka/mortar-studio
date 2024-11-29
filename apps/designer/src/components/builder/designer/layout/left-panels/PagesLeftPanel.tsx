import { File, Settings } from "lucide-react";
import { useLeftPanelContext } from "../../context/left-panel.context";
import LeftPanelContainer from "./LeftPanelContainer";
import { cn } from "@/lib/utils";

export default function PagesLeftPanel() {
    const { state: { activePanel } } = useLeftPanelContext()
    return (
        <>
            <LeftPanelContainer show={activePanel == 'pages'}>
                <EachPage />
                <EachPage active />
                <EachPage />
            </LeftPanelContainer>
        </>
    )
}

const EachPage = ({active}:{active?: boolean}) => {
    return <div className={cn("p-default hover:bg-card border-b flex items-center gap-default group cursor-pointer", {
        "bg-card": active
    })}>
        <div className="text-muted-foreground group-hover:text-foreground">
            <File />
        </div>
        <div className="flex flex-col gap-1 flex-1">
            <p>The page name</p>
            <small className='text-muted-foreground'>/post/:post_id</small>
        </div>
        <button className="group-hover:opacity-100 opacity-0 text-muted-foreground hover:text-foreground transition-opacity duration-300">
            <Settings className="h-5 w-5" />
        </button>
    </div>
}
