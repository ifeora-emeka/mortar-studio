import React, { useState, useEffect } from 'react';
import { usePreviewContext } from "@/components/builder/context/preview.context";

const boundingBoxStyles: React.CSSProperties = {
    position: 'absolute',
    border: '2px solid #FF5733',
    pointerEvents: 'none',
    zIndex: 9998,
    boxSizing: 'border-box',
    // backgroundColor: 'rgba(255, 87, 51, 0.1)',
};

const componentBadgeStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-24px',
    left: '0px',
    backgroundColor: '#FF5733',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '4px 4px 0 0',
    fontSize: '12px',
    fontWeight: 'bold',
    zIndex: 5000,
};

export default function ComponentSelector() {
    const {
        state: {
            activeElement,
            components
        }
    } = usePreviewContext();
    const [boundingBox, setBoundingBox] = useState<DOMRect | null>(null);

    const activeComponent = activeElement
        ? components.find(comp =>
            comp.elements.some(el => el.id === activeElement.id)
        )
        : null;

    const rootElement = activeComponent
        ? activeComponent.elements.find(el => el.parent_element_id === null)
        : null;

    useEffect(() => {
        const updateBoundingBox = () => {
            if (!rootElement) {
                setBoundingBox(null);
                return;
            }

            const iframe = document.querySelector('iframe') as HTMLIFrameElement;
            if (!iframe) return;

            const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDocument) return;

            const selectedElement = iframeDocument.getElementById(rootElement.id);
            if (!selectedElement) return;

            const rect = selectedElement.getBoundingClientRect();

            const iframeRect = iframe.getBoundingClientRect();

            setBoundingBox({
                x: rect.x + iframeRect.x,
                y: rect.y + iframeRect.y,
                width: rect.width,
                height: rect.height,
                top: rect.top + iframeRect.y,
                right: rect.right + iframeRect.x,
                bottom: rect.bottom + iframeRect.y,
                left: rect.left + iframeRect.x,
            } as DOMRect);
        };

        updateBoundingBox();

        window.addEventListener('resize', updateBoundingBox);

        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'selectElement') {
                updateBoundingBox();
            }
        };
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('resize', updateBoundingBox);
            window.removeEventListener('message', handleMessage);
        };
    }, [rootElement]);

    if (!boundingBox) return null;

    return (
        <div
            style={{
                ...boundingBoxStyles,
                left: boundingBox.left - 146,
                top: boundingBox.top - 105,
                width: boundingBox.width,
                height: boundingBox.height,
                zIndex: 4999
            }}
        >
            {/* Component Name Badge */}
            {activeComponent && (
                <div style={componentBadgeStyles}>
                    {activeComponent.name}
                </div>
            )}
        </div>
    );
}