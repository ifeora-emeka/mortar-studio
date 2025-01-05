import {useLeftPanelContext} from "@/components/builder/context/left-panel.context.tsx";
import LeftPanelContainer
    from "@/components/builder/designer/layout/left-panels/LeftPanelContainer.tsx";
import {CodeIcon, LucideIcon, TypeIcon} from "lucide-react";
import {useState} from "react";
import MetadataSettings
    from "@/components/builder/designer/layout/left-panels/site-settings/MetadataSettings.tsx";
import FontSettings
    from "@/components/builder/designer/layout/left-panels/site-settings/FontSettings.tsx";
import {cn} from "@/lib/utils.ts";

const settings: {
    id: string;
    label: string;
    Icon: LucideIcon;
}[] = [
    {
        id: 'meta-tags',
        label: "Meta tags",
        Icon: CodeIcon
    },
    {
        id: 'fonts',
        label: "Fonts",
        Icon: TypeIcon
    },
]

export default function SiteSettingsPanel() {
    const {state: {activePanel}} = useLeftPanelContext();
    const [activeSetting, setActiveSetting] = useState('');

    return <>
        <MetadataSettings show={activeSetting === 'meta-tags'} />
        <FontSettings show={activeSetting === 'fonts'} />
        <LeftPanelContainer
            show={activePanel === 'settings'}
        >
            <div className="flex flex-col">
                {
                    settings.map((item) => {
                        return <button
                            key={item.id}
                            onClick={() => {
                                if(activeSetting === item.id) {
                                    setActiveSetting('')
                                }else {
                                    setActiveSetting(item.id)
                                }
                            }}
                            className={cn('border-b p-default flex items-center gap-default text-muted-foreground hover:bg-accent hover:text-foreground', {
                                "bg-accent text-foreground": activeSetting === item.id
                            })}
                        >
                            <item.Icon className={'h-5 w-5'}/>
                            <span>{item.label}</span>
                        </button>
                    })
                }
            </div>
        </LeftPanelContainer>
    </>
}

