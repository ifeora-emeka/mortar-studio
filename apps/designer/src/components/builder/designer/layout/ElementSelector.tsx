import React, { useState, useEffect } from 'react';
import { usePreviewContext } from "@/components/builder/context/preview.context";

const boundingBoxStyles: React.CSSProperties = {
    position: 'absolute',
    border: '2px solid #4A90E2',
    pointerEvents: 'none',
    zIndex: 9999,
    boxSizing: 'border-box',
    // backgroundColor: 'rgba(74, 144, 226, 0.1)',
};

const componentBadgeStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-24px',
    left: '0px',
    backgroundColor: '#4A90E2',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '4px 4px 0 0',
    fontSize: '12px',
    fontWeight: 'bold',
    zIndex: 5001,
};

export default function ElementSelector() {
    const {
        state: {
            activeElement,
        }
    } = usePreviewContext();
    const [boundingBox, setBoundingBox] = useState<DOMRect | null>(null);

    useEffect(() => {
        const updateBoundingBox = () => {
            if (!activeElement) {
                setBoundingBox(null);
                return;
            }

            const iframe = document.querySelector('iframe') as HTMLIFrameElement;
            if (!iframe) return;

            const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDocument) return;

            const selectedElement = iframeDocument.getElementById(activeElement.id);
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
    }, [activeElement]);

    if (!boundingBox) return null;

    if(!activeElement?.parent_element_id) return null;

    return (
        <div
            style={{
                ...boundingBoxStyles,
                left: boundingBox.left - 146,
                top: boundingBox.top - 105,
                width: boundingBox.width,
                height: boundingBox.height,
                zIndex: 5000,
                userSelect: 'none'
            }}
        >
            {/* Component Name Badge */}
            {activeElement && (
                <div style={componentBadgeStyles}>
                    {activeElement.htmlTag}
                </div>
            )}

            {/* Resize Handle */}
            <div
                style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#4A90E2',
                    borderRadius: '50%',
                    zIndex: 5001
                }}
            />
        </div>
    );
}