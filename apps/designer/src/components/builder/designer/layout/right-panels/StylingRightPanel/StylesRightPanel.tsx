import RightPanelContainer from "../RightPanelContainer.tsx";
import {useRightPanelContext} from "@/components/builder/context/right-panel.context.tsx";
import ElementSettings
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/ElementSettings.tsx";
import {
    Accordion,
} from "@/components/ui/accordion.tsx";
import TypographyStyles
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/typography/TypographyStyles.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import BackgroundProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/background/BackgroundProperty.tsx";
import LayoutProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/layout/LayoutProperty.tsx";
import BorderProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/border/BorderProperty.tsx";
import SizeProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/size/SizeProperty.tsx";
import PlacementProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/position/PlacementProperty.tsx";
import SpacingProperty
    from "@/components/builder/designer/layout/right-panels/StylingRightPanel/spacing/SpacingProperty.tsx";

export default function StylesRightPanel() {
    const {state: {activePanel}} = useRightPanelContext()

    return (
        <RightPanelContainer
            show={activePanel == 'styling'} label={'Styling'}
            headerComponent={
                <>
                    <div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Default"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    value="default">Default</SelectItem>
                                <SelectItem
                                    value="hover">Hover</SelectItem>
                                <SelectItem
                                    value="focus">Focus</SelectItem>
                                <SelectItem
                                    value="disabled">Disabled</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </>
            }
        >
            <Accordion
                className={'pb-40'}
                type="multiple"
                // defaultValue={['typography', 'background', 'layout', 'element-settings', 'border']}
            >
                <ElementSettings/>
                <SizeProperty />
                <LayoutProperty/>
                <PlacementProperty />
                <TypographyStyles/>
                <SpacingProperty />
                <BackgroundProperty/>
                <BorderProperty />
            </Accordion>
        </RightPanelContainer>
    );
}