import { useRightPanelContext } from "../../context/right-panel.context";
import RightPanelContainer from "./RightPanelContainer";
import { useDesignerContext } from "@/__mock__/TestDesginerContext.tsx";
import { Input } from "@/components/ui/input.tsx";
import React, { useState, useEffect } from "react";

export default function StylesRightPanel() {
    const { state: { activePanel } } = useRightPanelContext();
    const { state: { elements, activeElementID }, dispatch } = useDesignerContext();
    const [className, setClassName] = useState('');
    const [src, setSrc] = useState('');

    useEffect(() => {
        const activeElement = elements.find(el => el.id === activeElementID);
        if (activeElement) {
            setClassName(activeElement.className);
            setSrc(activeElement.attributes.src || '');
        }
    }, [activeElementID, elements]);

    const updateClassName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setClassName(e.target.value);
        dispatch({
            type: 'UPDATE_ELEMENT',
            payload: { ...elements.find(el => el.id === activeElementID), className: e.target.value }
        });
    };

    const updateSrc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSrc(e.target.value);
        dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
                ...elements.find(el => el.id === activeElementID),
                attributes: { ...elements.find(el => el.id === activeElementID)?.attributes, src: e.target.value }
            }
        });
    };

    return (
        <RightPanelContainer show={activePanel == 'styling'}>
            <div>StylesRightPanel</div>
            <div>
                <textarea
                    rows={6}
                    placeholder={'enter class name'}
                    value={className}
                    onChange={updateClassName}
                />
                <Input
                    placeholder={'enter src attribute..'}
                    value={src}
                    onChange={updateSrc}
                />
            </div>
        </RightPanelContainer>
    );
}