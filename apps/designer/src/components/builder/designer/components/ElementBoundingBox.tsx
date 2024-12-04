import React, { useEffect } from 'react';

interface ElementBoundingBoxProps {
    activeElementID: string;
    frameRef: React.RefObject<HTMLIFrameElement>;
    setActiveElementID: (id: string | null) => void;
}

const ElementBoundingBox: React.FC<ElementBoundingBoxProps> = ({ activeElementID, frameRef }) => {
    useEffect(() => {
        const frameWindow = frameRef.current?.contentWindow;

        const injectBoundingBoxScript = () => {
            const scriptContent = `
                (function() {
                    const boundingBox = document.createElement('div');
                    boundingBox.id = 'bounding-box';
                    boundingBox.style.position = 'absolute';
                    boundingBox.style.border = '2px solid blue';
                    boundingBox.style.zIndex = '9000';
                    boundingBox.style.pointerEvents = 'none';

                    const label = document.createElement('div');
                    label.id = 'bounding-box-label';
                    label.style.position = 'absolute';
                    label.style.top = '10px';
                    label.style.left = '0';
                    label.style.backgroundColor = 'blue';
                    label.style.color = 'white';
                    label.style.padding = '2px 4px';
                    label.style.fontSize = '12px';
                    label.style.borderRadius = '2px';
                    boundingBox.appendChild(label);

                    document.body.appendChild(boundingBox);

                    window.addEventListener('message', (event) => {
                        if (event.data.type === 'UPDATE_BOUNDING_BOX') {
                            const element = document.getElementById(event.data.elementID);
                            if (element) {
                                const rect = element.getBoundingClientRect();
                                boundingBox.style.top = rect.top + window.scrollY + 'px';
                                boundingBox.style.left = rect.left + window.scrollX + 'px';
                                boundingBox.style.width = rect.width + 'px';
                                boundingBox.style.height = rect.height + 'px';
                                label.textContent = element.tagName.toLowerCase();
                            }
                        }
                    });

                    const observer = new MutationObserver(() => {
                        const element = document.getElementById('${activeElementID}');
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            boundingBox.style.top = rect.top + window.scrollY + 'px';
                            boundingBox.style.left = rect.left + window.scrollX + 'px';
                            boundingBox.style.width = rect.width + 'px';
                            boundingBox.style.height = rect.height + 'px';
                        }
                    });

                    const element = document.getElementById('${activeElementID}');
                    if (element) {
                        observer.observe(element, { attributes: true, childList: true, subtree: true });
                    }
                })();
            `;

            const script = document.createElement('script');
            script.textContent = scriptContent;
            frameRef.current?.contentDocument?.body.appendChild(script);
        };

        if (frameWindow) {
            injectBoundingBoxScript();
        }

        const updateBoundingBox = () => {
            frameWindow?.postMessage({ type: 'UPDATE_BOUNDING_BOX', elementID: activeElementID }, '*');
        };

        updateBoundingBox();

        const handleScroll = () => {
            updateBoundingBox();
        };

        frameWindow?.addEventListener('scroll', handleScroll);
        return () => {
            frameWindow?.removeEventListener('scroll', handleScroll);
        };
    }, [activeElementID, frameRef]);

    return null;
};

export default ElementBoundingBox;