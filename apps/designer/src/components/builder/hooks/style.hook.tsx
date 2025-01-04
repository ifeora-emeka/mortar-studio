import { useElement } from "@/components/builder/hooks/element.hook.tsx";
import {MortarStyle} from "@repo/common/schema/styles";

export const useElementStyle = () => {
    const { updateElement } = useElement();

    const updateTailwindStyles = (style: MortarStyle) => {
        updateElement({ tailwindStyles: style });
    };

    return { updateTailwindStyles };
};