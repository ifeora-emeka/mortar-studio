import RightPanelContainer
    from "@/components/builder/designer/layout/right-panels/RightPanelContainer.tsx";
import {useRightPanelContext} from "@/components/builder/context/right-panel.context.tsx";
import AddCustomProps
    from "@/components/builder/designer/layout/right-panels/CustomPropsRightPanel/AddCustomProps.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {MortarComponentProps} from "@repo/common/schema/component";

export default function CustomPropsRightPanel() {
    const {state: {activePanel}} = useRightPanelContext();
    const {state: {activeComponents}} = usePreviewContext();

    return <>
        <RightPanelContainer show={activePanel === 'custom-properties'}>
            <header
                className={'border-b h-header px-sm flex items-center text-muted-foreground'}>
                Custom properties
            </header>
            <div className={'p-sm flex flex-col gap-sm'}>
                {
                    activeComponents && activeComponents[0]?.props?.map(prop => {
                        return <EachProp props={prop} key={prop.id}/>
                    })
                }
                <Separator className={'my-default'}/>
                {
                    activeComponents.length > 0 && <AddCustomProps/>
                }
            </div>
        </RightPanelContainer>
    </>
}

const EachProp = ({props}: { props: MortarComponentProps }) => {
    const [data, setData] = useState(props)

    useEffect(() => {
        setData(props)
    }, [props])

    return <>
        <div className={'flex flex-col p-sm border rounded-lg gap-sm'}>
            <label className={'text-muted-foreground'}>{data.label}</label>
            {
                data.dataType == 'string' && <Textarea
                    className={'bg-accent'}
                    placeholder={'Enter value'}
                    value={data.defaultValue}
                />
            }
            {
                data.dataType == 'boolean' && <div className={'flex justify-start'}>
                    <ToggleGroup type="single" value={'no'}>
                        <ToggleGroupItem value="yes" aria-label="Toggle yes" >
                            Yes
                        </ToggleGroupItem>
                        <ToggleGroupItem value="no" aria-label="Toggle no">
                            No
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            }
        </div>
    </>
}
