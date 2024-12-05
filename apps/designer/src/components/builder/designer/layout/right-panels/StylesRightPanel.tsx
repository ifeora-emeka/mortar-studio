import RightPanelContainer from "./RightPanelContainer";
import {Input} from "@/components/ui/input.tsx";
import {useRightPanelContext} from "@/components/builder/context/right-panel.context.tsx";


export default function StylesRightPanel() {
    const {state: {activePanel}} = useRightPanelContext()

    return (
        <RightPanelContainer show={activePanel == 'styling'}>
            <div className={'p-default'}>
                <div>StylesRightPanel</div>
                <div>
                <textarea
                    className={'bg-background text-foreground w-full p-default rounded-lg outline-none mt-default'}
                    rows={6}
                    placeholder={'enter class name'}
                />
                    <Input
                        placeholder={'enter src attribute..'}
                    />
                </div>
            </div>
        </RightPanelContainer>
    );
}