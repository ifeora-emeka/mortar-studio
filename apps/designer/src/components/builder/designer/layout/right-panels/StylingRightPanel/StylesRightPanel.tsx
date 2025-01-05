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
                type="multiple"
                defaultValue={['typography', 'background', 'layout', 'element-settings', 'border']}
            >
                <ElementSettings/>
                <LayoutProperty/>
                <TypographyStyles/>
                <BackgroundProperty/>
                <BorderProperty />
            </Accordion>
        </RightPanelContainer>
    );
}