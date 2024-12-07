import React, { useState, useEffect } from 'react';
import { usePreviewContext } from "@/components/builder/context/preview.context";

const boundingBoxStyles: React.CSSProperties = {
    position: 'absolute',
    border: '2px solid #4A90E2',
    pointerEvents: 'none',
    zIndex: 9999,
    boxSizing: 'border-box',
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
            activeElements,
        }
    } = usePreviewContext();
    const [boundingBoxes, setBoundingBoxes] = useState<DOMRect[]>([]);

    useEffect(() => {
        const updateBoundingBoxes = () => {
            if (activeElements.length === 0) {
                setBoundingBoxes([]);
                return;
            }

            const iframe = document.querySelector('iframe') as HTMLIFrameElement;
            if (!iframe) return;

            const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDocument) return;

            const newBoundingBoxes = activeElements.map(activeElement => {
                const selectedElement = iframeDocument.getElementById(activeElement.id);
                if (!selectedElement) return null;

                const rect = selectedElement.getBoundingClientRect();
                const iframeRect = iframe.getBoundingClientRect();

                return {
                    x: rect.x + iframeRect.x,
                    y: rect.y + iframeRect.y,
                    width: rect.width,
                    height: rect.height,
                    top: rect.top + iframeRect.y,
                    right: rect.right + iframeRect.x,
                    bottom: rect.bottom + iframeRect.y,
                    left: rect.left + iframeRect.x,
                } as DOMRect;
            }).filter(Boolean) as DOMRect[];

            setBoundingBoxes(newBoundingBoxes);
        };

        updateBoundingBoxes();

        window.addEventListener('resize', updateBoundingBoxes);

        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'selectElement') {
                updateBoundingBoxes();
            }
        };
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('resize', updateBoundingBoxes);
            window.removeEventListener('message', handleMessage);
        };
    }, [activeElements]);

    if (boundingBoxes.length === 0) return null;

    return (
        <>
            {boundingBoxes.map((boundingBox, index) => (
                <div
                    key={index}
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
                    {activeElements[index] && (
                        <div style={componentBadgeStyles}>
                            {activeElements[index].htmlTag}
                        </div>
                    )}
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
            ))}
        </>
    );
}