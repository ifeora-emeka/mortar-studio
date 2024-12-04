import {File, Pencil} from "lucide-react";
import {useLeftPanelContext} from "@/components/builder/context/left-panel.context";
import LeftPanelContainer from "./LeftPanelContainer";
import {cn} from "@/lib/utils";
import {MortarPage} from '@repo/common/schema/page'
import {useEffect, useState} from "react";
import {LOCAL_API_URL} from "@/components/builder/config/api.config.ts";

export default function PagesLeftPanel() {
    const {state: {activePanel}} = useLeftPanelContext();
    const [list, setList] = useState<MortarPage[]>([]);

    const getPages = async () => {
        try {
            const res = await fetch(`${LOCAL_API_URL}/pages`);
            const data = await res.json();
            setList(data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getPages();
    }, []);

    return (
        <>
            <LeftPanelContainer show={activePanel == 'pages'} onAdd={() => {}}>
                <div className="flex flex-col gap-sm p-sm">
                    {
                        list.map((page) => (
                            <EachPage key={page.id} page={page}/>
                        ))
                    }
                </div>
            </LeftPanelContainer>
        </>
    )
}

const EachPage = ({active, page}: { active?: boolean; page: MortarPage }) => {
    return <div
        className={cn("p-default hover:bg-accent border rounded-lg flex items-center gap-default group cursor-pointer", {
            "bg-card": active
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
