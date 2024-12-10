import { usePreviewContext } from "@/components/builder/context/preview.context.tsx";
import { MortarComponent, MortarComponentProps } from "@repo/common/schema/component";

export const useComponent = () => {
    const { state, setPreviewState } = usePreviewContext();

    const getActiveComponent = (): MortarComponent | null => {
        return state.activeComponents.length > 0 ? state.activeComponents[0] : null;
    };

    const addProps = (newProps: MortarComponentProps) => {
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const updatedComponent: MortarComponent = {
            ...activeComponent,
            props: [...activeComponent.props, newProps]
        };

        setPreviewState({
            activeComponents: [updatedComponent],
            components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp)
        });
    };

    const removeProps = (propIds: string[]) => {
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const updatedProps = activeComponent.props.filter(prop => !propIds.includes(prop.id));

        const updatedComponent = {
            ...activeComponent,
            props: updatedProps
        };

        setPreviewState({
            activeComponents: [updatedComponent],
            components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp)
        });
    };

    const updateProps = (updatedProps: Partial<MortarComponentProps>[]) => {
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const newProps = activeComponent.props.map(prop => {
            const updatedProp = updatedProps.find(up => up.id === prop.id);
            return updatedProp ? { ...prop, ...updatedProp } : prop;
        });

        const updatedComponent = {
            ...activeComponent,
            props: newProps
        };

        setPreviewState({
            activeComponents: [updatedComponent],
            components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp)
        });
    };

    const updateComponent = (updatedComponentData: Partial<MortarComponent>) => {
        const activeComponent = getActiveComponent();
        if (!activeComponent) return;

        const updatedComponent = {
            ...activeComponent,
            ...updatedComponentData
        };

        setPreviewState({
            activeComponents: [updatedComponent],
            components: state.components.map(comp => comp.id === activeComponent.id ? updatedComponent : comp)
        });
    };

    return {
        addProps,
        removeProps,
        updateProps,
        updateComponent
    };
};