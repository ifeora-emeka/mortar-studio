import { usePreviewContext } from "@/components/builder/context/preview.context.tsx";
import { MortarElementInstance } from "@repo/common/schema/instance";

export const useInstance = () => {
    const { state: {activeElements}, pushToArray } = usePreviewContext();

    const addInstanceToActiveElement = (instance: MortarElementInstance) => {
        const activeElement = activeElements[0];
        if (!activeElement) return;

        const updatedInstance = {
            ...instance,
            parentElement: activeElement.id,
        };

        pushToArray('instances', updatedInstance);
    };

    return {
        addInstanceToActiveElement,
    };
};