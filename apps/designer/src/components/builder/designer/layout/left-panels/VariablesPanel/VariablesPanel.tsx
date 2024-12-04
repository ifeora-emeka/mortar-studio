import {useLeftPanelContext} from "@/components/builder/context/left-panel.context.tsx";
import LeftPanelContainer
    from "@/components/builder/designer/layout/left-panels/LeftPanelContainer.tsx";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {MortarVariableSet} from "@repo/common/schema/variables";
import {v7 as UID} from 'uuid'
import slugify from "slugify";
import EachVariableSet
    from "@/components/builder/designer/layout/left-panels/VariablesPanel/EachVariableSet.tsx";
import VariableListPanel
    from "@/components/builder/designer/layout/left-panels/VariablesPanel/VariableListPanel.tsx";
import {useState} from "react";


export default function VariablePanel() {
    const [selectedSet, setSelectedSet] = useState<MortarVariableSet | null>(null);
    return (
        <>
            <SetList onSetSelect={set => setSelectedSet(set)} selectedSetID={selectedSet?.id || null} />
            <VariableListPanel show={(selectedSet) as unknown as boolean} selectedSetID={selectedSet?.id || null} />
        </>
    );
}

const SetList = ({onSetSelect, selectedSetID}: {onSetSelect: (set:MortarVariableSet) => void; selectedSetID: string | null;}) => {
    const {state: {activePanel}} = useLeftPanelContext();
    const {pushToArray, state: {variableSets}} = usePreviewContext();

    const handleAddVariableSet = () => {
        const newVariableSet: (MortarVariableSet & {
            new: boolean
        }) = {
            name: 'Untitled collection',
            id: UID(),
            slug: slugify(`set-${variableSets.length}`),
            index: variableSets.length,
            new: true
        };
        pushToArray("variableSets", newVariableSet);
    };

    return <>
        <LeftPanelContainer
            show={activePanel === 'variables'}
            onAdd={handleAddVariableSet}
        >
            <div className="flex flex-col">
                {
                    variableSets.map((variableSet) => (
                        <EachVariableSet
                            key={variableSet.id}
                            variableSet={variableSet}
                            onClick={() => onSetSelect(variableSet)}
                            active={selectedSetID === variableSet.id}
                            onSetSelect={onSetSelect}
                        />
                    ))
                }
            </div>
        </LeftPanelContainer>
    </>
}
