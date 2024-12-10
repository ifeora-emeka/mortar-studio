import {MortarElementInstance} from '@repo/common/schema/instance'
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import ComponentRenderer
    from "@/components/builder/designer/components/Renderers/ComponentRenderer.tsx";


export default function InstanceRenderer({instance}: {
    instance: MortarElementInstance
}) {
    const {state: {components}} = usePreviewContext();
    const componentToRender = components.find(comp => comp.id == instance.ref.split("::")[2])

    if(!componentToRender) {
        return <div className={'p-4 rounded-lg bg-red-100 text-red-600 flex'}>
            ERROR: Component not found
        </div>
    }

    return <>
        <ComponentRenderer component={componentToRender} instance={instance} />
    </>
}
